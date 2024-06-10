// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        url: 'https://accounts.google.com/o/oauth2/auth',
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
          prompt: 'consent', 
        },
      },
    }),
  ],
  session: {
		strategy: 'jwt',
	},
  callbacks: {

    async jwt({ token, user, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			console.log(token);
			return token;
		},
    
  },
  secret: process.env.NEXTAUTH_SECRET,
});
