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

async function getData(accessToken: string) {
    const res: any = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/myKudos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
    })
    if (!res.ok){
        throw new Error('Fail fetching data from server')
    }
    return res.json()
}


export default async function MyKudos() {
    const session = await getServerSession(authOptions);
    if(!session) {
        redirect('/login');
    }

    const data = await getData(session?.user?.accessToken)
    const sortedData = {
        sent: data.data.sent?.sort((a: any, b: any) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }),
        received: data.data.received?.sort((a: any, b: any) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }),
        liked: data.data.liked?.sort((a: any, b: any) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }),
        collected: data.data.collected?.sort((a: any, b: any) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
    }

    return (
        <div className={styles.myKudosPage}>
            <h3>My Kudos</h3>
            <MyKudosTab kudos={sortedData}/>
            <ScrollButton />
        </div>
    )
}