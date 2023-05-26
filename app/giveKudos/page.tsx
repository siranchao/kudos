'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import Process from "../components/Process"
import styles from '../styles/giveKudos.module.css'
import { newKudo } from '../controller/newKudo'
import { useAtom } from 'jotai'
import { receiverAtom, gifIdAtom, newMessageAtom, senderAtom } from '../../store'

export default function GiveKudos() {
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const [receiver, setReceiver] = useAtom(receiverAtom);
    const [gifId, setGifId] = useAtom(gifIdAtom);
    const [newMessage, setNewMessage] = useAtom(newMessageAtom);
    const [sender, setSender] = useAtom(senderAtom);

    const createKudos = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            //router.push('/homePage')
        }, 2000)
        setReceiver([]);
        setGifId("");
        setNewMessage([]);
        setSender("");  
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