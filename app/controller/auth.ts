import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export async function registerUser(email: string, password: string, username: string) {
    try {
        const res: any = await fetch(`${process.env.NEXT_PUBLIC_API}/user/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: username,
            })
        })
        const data = await res.json()

        if(res.status === 200) {
            console.log('Successfully registered user')
            return data.message
        } else {
            throw new Error(data.message)
        }


    } catch (error: any) {
        console.error(error)
        throw new Error(error)
    }
}

export function signJwtToken(payload: JwtPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {expiresIn: '30d'});
    return token;
}



//this method is no longer used
// export async function loginUser(email: string, password: string) {
//     try {
//         const res: any = await fetch(`${process.env.NEXT_PUBLIC_API}/user/auth/login`, {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify({
//                 email: email,
//                 password: password,
//             })
//         })
//         const data = await res.json()

//         if(res.status === 200) {
//             console.log('Successfully logged in user')
//             return data
//         } else {
//             throw new Error(data.message)
//         }

//     } catch(error: any) {
//         console.error(error)
//         throw new Error(error)
//     }
// }