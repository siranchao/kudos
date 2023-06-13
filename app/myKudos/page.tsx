import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import styles from '../styles/myKudos.module.css'
import { getServerSession} from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import MyKudosTab from '../components/MyKudosTab';
import ScrollButton from '../components/ScrollButton';

 
export const metadata: Metadata = {
  title: 'Kudos | My Kudos',
  description: 'View My Kudos Page',
};

export default async function MyKudos() {
    const kudos: any = {
        sent: [1],
        received: [1],
        liked: [1],
        collected: [1],
    };

    const session = await getServerSession(authOptions);
    if(!session) {
        redirect('/login');
    }

    return (
        <div className={styles.myKudosPage}>
            <h3>My Kudos</h3>
            <MyKudosTab kudos={kudos}/>
            <ScrollButton />
        </div>
    )
}