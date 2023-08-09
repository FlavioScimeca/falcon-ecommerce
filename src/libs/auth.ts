import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { NextAuthOptions } from 'next-auth';
import clientPromise from './mongodb';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          placeholder: 'email@email.com',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide a valid credentials');
        }

        const client = await MongoClient.connect(
          process.env.MONGODB_URI as string
        );

        const db = client.db();

        const user: any = await db
          .collection('users')
          .findOne({ email: credentials.email });

        // console.log({ USERR______: user });
        if (!user) {
          throw new Error('User not registered');
        }

        const passwordCheck = await bcrypt.compare(
          credentials.password,
          user?.hashedPassword
        );

        if (passwordCheck == false) {
          throw new Error('Invalid Password');
        }

        await client.close();

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  adapter: MongoDBAdapter(clientPromise),
  debug: process.env.NODE_ENV == 'development',
  secret: process.env.NEXTAUTH_SECRET,
  // pages : {}
};
