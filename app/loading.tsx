'use client';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';


export default function Loading() {

    return (
        <Box sx={{ width: '80%', m: '5rem auto' }}>
            <Typography sx={{ mb: '1rem' }}>Loading Page...</Typography>
            <LinearProgress />
        </Box>
    )
}