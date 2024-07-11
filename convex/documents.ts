import { action, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { api } from "./_generated/api";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY

});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getDocuments = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      return [];
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

    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      throw new ConvexError('Not authenticated')
    }

    const document = await ctx.db.get(args.documentId)

    if (!document) {
      throw new ConvexError('Document not found')
    }

    if (document?.tokenIdentifier !== userId) {
      throw new ConvexError('Not authorized')
    }

    return {...document, documentUrl: await ctx.storage.getUrl(document.fileId)}
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

    await ctx.db.insert('documents', {
      title: args.title,
      fileId: args.fileId,
      tokenIdentifier: userId,
    }) 
  }
}) 


export const askQuestion = action({
  args:{
    question: v.string(),
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier

    if (!userId) {
      throw new ConvexError('Not authenticated')
    }



    const document = await ctx.runQuery(api.documents.getDocument, {
      documentId: args.documentId
    })

    if (!document) {
      throw new ConvexError('Document not found')
    }

    const file = await ctx.storage.get(document.fileId);

    if (!file) {
      throw new ConvexError('File not found')
    }


    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-3.5-turbo',
    });
    
    return chatCompletion.choices[0].message.content
  }
})