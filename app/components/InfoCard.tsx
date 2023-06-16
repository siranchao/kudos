'use client';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import infoImg from '../../public/images/no-data.jpg'


export default function InfoCard({ info }: any) {
  return (
    <Card sx={{ maxWidth: 400, margin: '2rem auto' }}>
      <CardMedia
        sx={{ height: 250, width: 400 }}
        component="img"
        image={infoImg.src}
        title="info img"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Sorry, no information available
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {info}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="/giveKudos"><Button size="small">Create Kudos</Button></Link>
        <Link href="/"><Button size="small">Back to Home</Button></Link>
      </CardActions>
    </Card>
  );
}