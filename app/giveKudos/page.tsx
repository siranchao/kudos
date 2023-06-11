'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import Process from "../components/Process"
import styles from '../styles/giveKudos.module.css'
import { newKudo } from '../controller/newKudo'
import { useAtom } from 'jotai'
import { kudoAtom } from '@/store';
import { Metadata } from 'next';
import { useSession } from 'next-auth/react';
 
export const metadata: Metadata = {
  title: 'Kudos | Create New',
  description: 'Kudos Create New Kudo Page',
};

export default function GiveKudos() {
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        }
    });
    
    const [loading, setLoading] = useState(false)
    const [kudo, setKudo] = useAtom(kudoAtom);

    const createKudos = async () => {
        setLoading(true)
        await newKudo(session?.user?.name || "", kudo.receiver, kudo.message, kudo.gif)

        setTimeout(() => {
            setLoading(false)
            setKudo({
                receiver: [],
                message: [],
                gif: null,
            })
            router.refresh()
            router.push('/homePage')
        }, 2000)
    }

    return (
        <>
            <div className={styles.giveKudos}>
                <Process/>

                <div style={{ padding: '4rem 0' }}>
                    <LoadingButton
                        sx={{ float: 'right' }}
                        variant="contained"
                        loadingPosition="end"
                        endIcon={<SendIcon />}
                        onClick={createKudos}
                        loading={loading}
                        disabled={kudo.gif === null || kudo.receiver.length === 0 || kudo.message.length === 0}
                    >
                        {loading ? <span>Sending Your Kudo</span> : <span>Create Kudo!</span>}
                    </LoadingButton>
                </div>
            </div>
        </>
    )

}