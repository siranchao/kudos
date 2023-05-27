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

export default function GiveKudos() {
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const [kudo, setKudo] = useAtom(kudoAtom);


    const createKudos = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)

            console.log(kudo)

            setKudo({
                gif: null,
                sender: "Siran",
                receiver: [],
                newMessage: []
            })
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
                    >
                        {loading ? <span>Sending Your Kudo</span> : <span>Create Kudo!</span>}
                    </LoadingButton>
                </div>
            </div>
        </>
    )
}