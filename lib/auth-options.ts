import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectToDB();

        const user = await User.findOne({ email: credentials!.email });
        if (!user) return null;

        const isMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isMatch) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          publicId: user.publicId,
          image: user.image || null,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectToDB();

        let existing = await User.findOne({ email: user.email });

        if (!existing) {
          existing = await User.create({
            name: user.name,
            email: user.email,
            image: user.image || null,
            publicId: nanoid(12),
          });
        }

        user.id = existing._id.toString();
        user.publicId = existing.publicId;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image || null;
        token.publicId = user.publicId;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.image,
        publicId: token.publicId,
      };
      return session;
    },
  },
};
