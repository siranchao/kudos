'use client';
import { useState } from 'react';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import styles from '../styles/auth.module.css'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { loginUser } from '../controller/auth';
import Loader from '../components/Loader';
import { useSession, signIn } from 'next-auth/react';

export const metadata: Metadata = {
    title: 'Kudos | Login',
    description: 'Kudos Login Page',
};

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    
    // const { data: session } = useSession();
    // if(session) {
    //     router.push('/');
    // }


    const submitForm = async (event: any) => {
        event.preventDefault();
        if(password.length < 6) {
            setWarning(true);
            setMessage("Password must be at least 6 characters");
            return;
        }

        try {
            const res: string = await loginUser(email, password);
            setSuccess(true);
            setMessage(res);
            setTimeout(() => {
                router.push('/homePage');
            }, 1000);

        } catch(error: any) {
            setWarning(true);
            setMessage(error.message);
        }
    }

    return (
        <div className={styles.layout}>
            <h3>Welcome to Kudos</h3>
            <p>Please enter your login information below:</p>
            <hr/>
            <div className={styles.formRoot} onSubmit={submitForm}>
                {warning && <p className={styles.warning}>{message}</p>}
                {success && <p className={styles.success}>{message}</p>}
                <form className={styles.form}>
                    <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    required
                    onChange={(e: any) => { 
                        setEmail(e.target.value);
                        setWarning(false);
                        setMessage(''); 
                    }}
                    />
                    <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    required
                    onChange={(e: any) => { 
                        setPassword(e.target.value);
                        setWarning(false);
                        setMessage(''); 
                    }}
                    />
                    <FormControlLabel control={<Switch />} label="Remember me" />
                    {success ? <Loader/> :
                    <Button variant="contained" color="primary" type="submit">
                        Login
                    </Button>
                    }
                </form>

                <hr/>
                <button onClick={() => signIn('google')}>Login with Google</button>
            </div>
        </div>
    )
    
}