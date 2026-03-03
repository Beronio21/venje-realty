import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const users = [
          { id: 1, name: 'Admin', username: 'admin', password: 'admin123', email: 'admin@venjerealty.ph' },
          { id: 2, name: 'User', username: 'user', password: 'user', email: 'user@venjerealty.ph' },
        ];
        const found = users.find(
          (u) => u.username === credentials.username && u.password === credentials.password
        );
        if (found) {
          return Promise.resolve({ id: found.id, name: found.name, email: found.email });
        }
        return Promise.resolve(null);
      },
    }),
  ],
});
export { handler as GET, handler as POST };
