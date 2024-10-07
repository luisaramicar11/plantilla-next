import NextAuth, { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { NextAuthOptions } from "next-auth";

interface Credentials {
  username: string;
  password: string;
}

interface IUser {
  _id:      string;
  email:    string;
  username: string;
  name:     string;
  phone:    string;
  __v:      number;
}

interface UserAuthenticate extends User {
  access_token?: string;
  user:         IUser; 
}

interface SessionAuthenticate extends Session {
  access_token: string;
  user:         IUser;   
}

interface JWTAuthenticate extends JWT {
  access_token: string;
  user:         IUser;
}

const handler:NextAuthOptions = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined): Promise<UserAuthenticate | null> {
        if (!credentials) return null;

        const res: Response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          return null;
        }

        const data: UserAuthenticate = await res.json();
        console.log(data)
        if (data.access_token && data.user) {
          return {
            id: data.id,
            access_token: data.access_token,
            user: data.user
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWTAuthenticate, user: UserAuthenticate | AdapterUser}) {
      if (user) {
        token.accessToken = (user as UserAuthenticate).access_token;
      }
      return token;
    },
    async session({ session, token }:{session: SessionAuthenticate, token: JWT}) {
      session.access_token = token.accessToken as string;  
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
