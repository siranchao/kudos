'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import Process from "../components/Process"
import styles from '../styles/giveKudos.module.css'

export default function GiveKudos() {
    const [clicked, setClick] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleClick = () => {
        setLoading(true)
    }

    const createKudos = () => {
        setClick(true);
        setTimeout(() => {
            setLoading(false)
            router.push('/homePage')
        }, 4000)
    }

    return (
        <>
            <div className={styles.giveKudos}>
                <Process clicked={clicked} setClick={setClick} />

                <div style={{ padding: '4rem 0' }}>
                    <LoadingButton
                        sx={{ float: 'right' }}
                        variant="contained"
                        loadingPosition="end"
                        endIcon={<SendIcon />}
                        onClick={() => { handleClick(); createKudos(); }}
                        loading={loading}
                    >
                        {loading ? <span>Sending Your Kudo</span> : <span>Create Kudo!</span>}
                    </LoadingButton>
                </div>
            </div>
        </>
    )
}