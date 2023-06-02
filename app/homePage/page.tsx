
import MainGrid from '../components/MainGrid';
import { Metadata } from 'next';
import styles from '../styles/homePage.module.css';
 
export const metadata: Metadata = {
  title: 'Kudos | Showcase',
  description: 'View All Kudos Page',
};

async function getData() {
    const res: any = await fetch('http://localhost:8080/api/kudo/allKudos', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }

export default async function Home() {
    const data: any = await getData()

    return (
        <div className={styles.kudosHomePage}>
            <h3>Welcome to Kudos App</h3>
            <hr />

            {data.data.length > 0 ? 
            <MainGrid kudos={data.data}/>
            :
            <h5>No Kudos</h5>}
    
            {/* <ScrollButton /> */}
            {/* <PaginationBar /> */}
        </div>
    )
}