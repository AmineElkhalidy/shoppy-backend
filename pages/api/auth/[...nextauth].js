import NextAuth, { getServerSession } from "next-auth";

// MongoDB Adapter
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

// Client Promise
import clientPromise from "@/lib/mongodb";

// Google Provider
import GoogleProvider from "next-auth/providers/google";

const adminEmails = [
  "a.amineelkhalidy@gmail.com",
  "amineelkhalidy.a@gmail.com",
  "elkhalidyamine.a@gmail.com",
  "bynameofallah1@gmail.com",
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw Error("You are not an admin!");
  }
}
