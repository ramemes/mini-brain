import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";


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
