import { action, internalAction, internalMutation, internalQuery, mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import OpenAI from 'openai';
import { Doc, Id } from "./_generated/dataModel";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY

});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const hasAccessToDocument = async (
  ctx: MutationCtx | QueryCtx, 
  documentId: Id<"documents">
) => {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

  if (!userId) {
    // throw new ConvexError('Not authenticated')
    return null
  }

  const document = await ctx.db.get(documentId)

  if (!document) {
    // throw new ConvexError('Document not found')
    return null

  }

  if (document?.tokenIdentifier !== userId) {
    // throw new ConvexError('Not authorized')
    return null

  }

  return { document, userId }
}

export const hasAccessToDocumentQuery = internalQuery({
  args: {
    documentId: v.id("documents")
  },
  async handler(ctx, args) {
    return await hasAccessToDocument(ctx, args.documentId)
  }
})


export const getDocuments = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      return undefined;
    }

    return await ctx.db.query('documents')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier', 
        userId
      )).collect()
  }
})




export const getDocument = query({
  args: {
    documentId: v.id("documents")
  },
  async handler(ctx, args) {

    const accessObj = await hasAccessToDocument(ctx, args.documentId) as {document: Doc<"documents">, userId: string}

    if (!accessObj) return null

    const {document, userId} = accessObj
    return {...document, documentUrl: await ctx.storage.getUrl(document.fileId as Id<'_storage'>)}
  }
}) 


export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId: v.id("_storage"),
  },
  async handler(ctx, args) {

    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      throw new ConvexError('Not authenticated')
    }

    const documentId = await ctx.db.insert('documents', {
      title: args.title,
      fileId: args.fileId,
      description: "",
      tokenIdentifier: userId,
    }) 

    await ctx.scheduler.runAfter(0, internal.documents.generateDocumentDescription, {
      fileId: args.fileId,
      documentId,
    })
  }
}) 


export const askQuestion = action({
  args:{
    question: v.string(),
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {

    const {document, userId} = await ctx.runQuery(internal.documents.hasAccessToDocumentQuery, {
      documentId: args.documentId
    }) as {document: Doc<"documents">, userId: string}

    if (!document || !userId) {
      throw new ConvexError('You do not have access to this document')
    }

    const file = await ctx.storage.get(document.fileId as Id<'_storage'>);

    if (!file) {
      throw new ConvexError('File not found')
    }

    const text = await file.text();

    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion = 
      await openai.chat.completions.create({
        messages: [
          { 
            role: 'system', 
            content: `Here is a text file: ${text}`,
          },
          { 
            role: 'user', 
            content: `please answer this question: ${args.question}`,
          },
        ],
        model: 'gpt-4o-mini',
      });
    
    const response = chatCompletion.choices[0].message.content ?? 'could not generate a response.'

    // TODO: store user prompt as a chat record
    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: args.question,
      isHuman: true,
      tokenIdentifier: userId,
    })

    // TODO: store the AI response as a chat record

    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: response,
      isHuman: false,
      tokenIdentifier: userId,
    })
      
      
  }
})

export const generateDocumentDescription = internalAction({
  args: {
    fileId: v.id("_storage"),
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const file = await ctx.storage.get(args.fileId as Id<'_storage'>);

    if (!file) {
      throw new ConvexError('File not found')
    }

    const text = await file.text();

    const chatCompletion: OpenAI.Chat.Completions.ChatCompletion = 
      await openai.chat.completions.create({
        messages: [
          { 
            role: 'system', 
            content: `Here is a text file: ${text}`,
          },
          { 
            role: 'user', 
            content: `please generate a 1 sentence description for this document`,
          },
        ],
        model: 'gpt-4o-mini',
      });
    
    const response = chatCompletion.choices[0].message.content ?? 'could not generate description for this document.'

    await ctx.runMutation(internal.documents.updateDocumentDescription, {
      documentId: args.documentId,
      description: response,
    })
  }
})

export const updateDocumentDescription = internalMutation({
  args: {
    documentId: v.id("documents"),
    description: v.string(),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.documentId, {
      description: args.description
    })
  }
})

export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents")
  },
  async handler(ctx, args) {

    const accessObj = await hasAccessToDocument(ctx, args.documentId) as {document: Doc<"documents">, userId: string}

    if (!accessObj) throw new ConvexError('You do not have access to this document')


    const {document, userId} = accessObj

    await ctx.storage.delete(document.fileId as Id<'_storage'>)
    await ctx.db.delete(args.documentId)
  }
}) 