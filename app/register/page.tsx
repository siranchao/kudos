'use client';
import { useState } from 'react';
import styles from '../styles/auth.module.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { registerUser } from '../controller/auth';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';
import Head from 'next/head';


export default function Register() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');


    const submitForm = async (event: any) => {
        event.preventDefault();
        if(password.length < 6 || password2.length < 6) {
            setWarning(true);
            setMessage("Password must be at least 6 characters");
            return;
        }
        if(password !== password2) {
            setWarning(true);
            setMessage("Passwords do not match");
            return;
        }

        try {
            const res: string = await registerUser(email, password, username);
            setSuccess(true);
            setMessage(res);
            setTimeout(() => {
                router.push('/login');
            }, 1000);

        } catch(error: any) {
            setWarning(true);
            setMessage(error.message);
        }
    }

    return (
        <>
            <Head>
                <title>Kudos | Sign up</title>
                <meta property="og:title" key="title" content="Kudos | Sign up" />
                <meta name="description" key='description' content="Kudos sign up Page" />
                <meta name="viewport" key='viewport' content="width=device-width, initial-scale=1" />
            </Head>

            <div className={styles.layout}>
                <h3>Join Kudos</h3>
                <p>It only takes few seconds to create your account!</p>
                <hr/>
                <div className={styles.formRoot}>
                    {warning && <p className={styles.warning}>{message}</p>}
                    {success && <p className={styles.success}>{message}</p>}
                    <form className={styles.form} onSubmit={submitForm}>
                        <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        required
                        onChange={(event: any) => {
                            setEmail(event.target.value); 
                            setWarning(false); 
                            setMessage('')}}
                        />
                        <TextField
                        label="Display Name"
                        variant="outlined"
                        value={username}
                        required
                        onChange={(event: any) => {setUsername(event.target.value)}}
                        />
                        <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        required
                        onChange={(event: any) => {
                            setPassword(event.target.value); 
                            setWarning(false); 
                            setMessage('')}}
                        />
                        <TextField
                        label="Re-enter Password"
                        variant="outlined"
                        type="password"
                        value={password2}
                        required
                        onChange={(event: any) => {
                            setPassword2(event.target.value); 
                            setWarning(false); 
                            setMessage('')}}
                        />
                        {success ? <Loader /> : 
                        <Button variant="contained" color="primary" type="submit" disabled={warning}>
                        Sign Up
                        </Button>}

                    </form>
                </div>
            </div>
        </>

    )
    
}