import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkSpace = mutation({
  args: {
    message: v.any(),
    user: v.id('users'), // Ensure this matches the correct table name
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert('workspace', {
      message: args.message,
      user: args.user as any,
    });
    return workspaceId;
  },
});

export const GetWorkspace = query({
  args:{
    workspaceId:v.id('workspace')
  },
  handler: async (ctx, args) =>{
    const result = await ctx.db.get(args.workspaceId);
    return result;
  }

})

export const UpdateMessages= mutation({
  args:{
    workspaceId:v.id('workspace'),
    message:v.any()
  },
  handler:async (ctx, args)=>{
    const result=await ctx.db.patch(args.workspaceId,{message:args.message})
    return result;
  }
})
export const UpdateFiles= mutation({
  args:{
    workspaceId:v.id('workspace'),
    fileData:v.any()
  },
  handler:async (ctx, args)=>{
    const result=await ctx.db.patch(args.workspaceId,{fileData:args.fileData})
    return result;
  }
})
