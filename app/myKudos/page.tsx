
import { Metadata } from 'next';
import styles from '../styles/myKudos.module.css'
import InfoCard from '../components/InfoCard';
 
export const metadata: Metadata = {
  title: 'Kudos | My Kudos',
  description: 'View My Kudos Page',
};

export default function MyKudos() {

    const data = []

    return (
        <div className={styles.myKudosPage}>
            <h3>My Kudos</h3>
            <hr/>
            {data.length === 0 && <InfoCard info={"No Kudos in your collection"} />}
        </div>
    )
}