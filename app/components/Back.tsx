'use client';   
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function Back() {

    const router: any = useRouter();

    return (
        <div style={{ display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer',
            padding: '1rem' }}
            onClick={() => router.back()}
        >
            <ArrowBackIosNewIcon color="primary"/>
            <Button variant="text">Back</Button>
        </div>
    )
}