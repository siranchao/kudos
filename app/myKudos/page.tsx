import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import styles from '../styles/myKudos.module.css'
import InfoCard from '../components/InfoCard';
import { getServerSession} from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

 
export const metadata: Metadata = {
  title: 'Kudos | My Kudos',
  description: 'View My Kudos Page',
};

export default async function MyKudos() {
    const data = []

    const session = await getServerSession(authOptions);
    if(!session) {
        redirect('/login');
    }

    return (
        <div className={styles.myKudosPage}>
            <h3>My Kudos</h3>
            <hr/>
            {data.length === 0 && <InfoCard info={"No Kudos in your collection"} />}
        </div>
    )
}