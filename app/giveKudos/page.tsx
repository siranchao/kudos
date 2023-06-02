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
 
export const metadata: Metadata = {
  title: 'Kudos | Create New',
  description: 'Kudos Create New Kudo Page',
};

export default function GiveKudos() {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [kudo, setKudo] = useAtom(kudoAtom);

    const createKudos = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            newKudo(kudo.sender, kudo.receiver, kudo.newMessage, kudo.gif.id)
            setKudo({
                gif: null,
                sender: "Siran",
                receiver: [],
                newMessage: []
            })
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
                        disabled={kudo.gif === null || kudo.receiver.length === 0 || kudo.newMessage.length === 0}
                    >
                        {loading ? <span>Sending Your Kudo</span> : <span>Create Kudo!</span>}
                    </LoadingButton>
                </div>
            </div>
        </>
    )

}