'use client';
import Link from "next/link"
import { useSession,signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function SignBtn() {
    const router = useRouter();
    const { data: session } = useSession();


    return (
        <>
            {session ? 
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <p style={{lineHeight: '100%', marginBottom: '0', marginRight: '1rem'}}>Welcome, {session?.user?.name}</p>
                    <button className="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline" style={{marginRight: '1rem', fontSize: '1rem'}} onClick={() => signOut()}>
                    Logout
                    </button>
                </div>

                   :
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <button className="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline" style={{marginRight: '1rem', fontSize: '1rem'}} onClick={() => router.push('/login')}>
                    Login
                    </button>

                    <button className="ontario-header__language-toggler ontario-header-button ontario-header-button--without-outline" style={{marginRight: '1rem', fontSize: '1rem'}} onClick={() => router.push('/register')}>
                    Sign up
                    </button>
                </div>
            }
        </>
    )
    
}

