import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { hash } from "bcrypt";
import dbConnect from "../../../mongoose/dbconnect";
import User from "../../model/user";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../clientPromise";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await dbConnect();
        if (credentials == null) return null;

        try {
          const user = await User.findOne({ email: credentials.email });

          console.log(user, "user");

          if (!user) {
            return null;
          } else {
            return user;
          }
        } catch (err: any) {
          throw new Error("User Not Found");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/",
    error: "/my/dashboard",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
        };
      }
      return token;
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
