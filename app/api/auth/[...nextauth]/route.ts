import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signJwtToken } from "@/app/controller/auth";


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            
            async authorize(credentials, req) {
                const res: any = await fetch(`${process.env.NEXT_PUBLIC_API}/user/auth/login`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.username,
                        password: credentials?.password,
                    })
                })
                const data = await res.json()
                
                if (data) {
                    console.log('Successfully logged in user')
                    return data.data
                } else {
                    return null
                }
            }
        })        
    ],
    callbacks: {
        async jwt({token, user, account}: any) {
            if (!user?.accessToken && account) {
                //this is a google account
                token.accessToken = signJwtToken({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                })
            }
            //console.log("account: ", account);
            return {...token, ...user};
        },
        async session({session, token}: any) {
            session.user = token
            //console.log("session is: ", session);
            return session;
        }
    }
}

const handler: any = nextAuth(authOptions);

export {handler as GET, handler as POST};