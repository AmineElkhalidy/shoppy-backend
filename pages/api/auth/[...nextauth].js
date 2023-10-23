import NextAuth, { getServerSession } from "next-auth";

// MongoDB Adapter
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

// Client Promise
import clientPromise from "@/lib/mongodb";

// Google Provider
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  // Will be responsible for re-using an active connection to db without making a request again!
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (session?.user?.email) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
