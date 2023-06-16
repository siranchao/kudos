'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import Process from "../components/Process"
import styles from '../styles/giveKudos.module.css'
import { newKudo } from '../controller/kudo'
import { useAtom } from 'jotai'
import { kudoAtom } from '@/store';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
 

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
        await newKudo(session?.user?.name || "", kudo.receiver, kudo.message, kudo.gif, session?.user?.accessToken as string)

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
            <Head>
                <title>Kudos | Create New</title>
                <meta property="og:title" key="title" content="Kudos | Create New" />
                <meta name="description" key='description' content="Kudos Create New Kudo Page" />
                <meta name="viewport" key='viewport' content="width=device-width, initial-scale=1" />
            </Head>
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