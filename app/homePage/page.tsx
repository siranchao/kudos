import MainGrid from '../components/MainGrid';
import ScrollButton from '../components/ScrollButton';
import { Metadata } from 'next';
import styles from '../styles/homePage.module.css';
import InfoCard from '../components/InfoCard';
 
export const metadata: Metadata = {
  title: 'Kudos | Showcase',
  description: 'View All Kudos Page',
};

async function getData() {
  console.log("===================== fetching data... =====================")
  const res: any = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/allKudos`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
    const data: any = await getData()
    const sortedData = data.data.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })

    return (
        <div className={styles.kudosHomePage}>
            <br />
            {data.data.length > 0 ? 
            <MainGrid kudos={sortedData}/>
            :
            <InfoCard info={"No Kudos can be found at the moment, please try again later. Or try to create a new kudo"}/>}
    
            <ScrollButton />
        </div>
    )
}