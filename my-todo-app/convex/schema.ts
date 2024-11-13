import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    status: v.string(),
    createdAt: v.number(),
  }),
  users: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    createdAt: v.number(),
  }),
});
