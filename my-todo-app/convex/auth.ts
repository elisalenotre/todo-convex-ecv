import { v } from "convex/values";
import { mutation } from "./_generated/server";
import bcrypt from "bcryptjs";

export const signUp = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();
    if (existingUser) {
      throw new Error("Un utilisateur avec cet e-mail existe déjà.");
    }

    const passwordHash = await bcrypt.hash(args.password, 10);

    const userId = await ctx.db.insert("users", {
      email: args.email,
      passwordHash,
      createdAt: Date.now(),
    });

    return userId;
  },
});

export const logIn = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .first();
    if (!user) {
      throw new Error("E-mail ou mot de passe incorrect.");
    }

    const isPasswordCorrect = await bcrypt.compare(args.password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new Error("E-mail ou mot de passe incorrect.");
    }

    return { userId: user._id, email: user.email };
  },
});
