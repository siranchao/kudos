import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })        
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async redirect({url, baseUrl}: any) {
            return '/';
        },
        async jwt({token, account}: any) {
            return {...token, ...account};
        },
        async session({session, token}: any) {
            session.token = token;
            return session;
        }
    }
}

const handler: any = nextAuth(authOptions);

export {handler as GET, handler as POST};