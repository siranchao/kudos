import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            accessToken: string;
            sub: string;
            iat: number | string;
            exp: number | string,
            jti: string;
            picture?: string;
            image?: string;
        }
    }
}
