import Banner from './components/Banner'
import Link from 'next/link'
import styles from './styles/home.module.css'
import { Metadata } from 'next';
import { getServerSession} from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';


export const metadata: Metadata = {
  title: 'Kudos | Home',
  description: 'Kudos Home Page',
};

async function getData() {
  const res: any = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/kudosKpi`)
  if (!res.ok){
    throw new Error('Fail fetching data from server')
  }
  return res.json()
}

export default async function Index() {
  const session = await getServerSession(authOptions);
  const kpi: any = await getData();

  return (
    <main>
      <Banner/>

      <div className={styles.indexpageContent}>
        <div className="ontario-callout" style={{maxWidth: '90vw'}}>
            {session ?
              <div>
                <h2 className="ontario-callout__title ontario-h5">Welcome to Kudos, {session?.user?.name}</h2>
                <p className={styles.paragraph}><strong>{kpi.recent}</strong> Kudos created in the past 30 days, <strong>{kpi.total}</strong> Kudos created in total. </p>
                <p className={styles.paragraph}>You can <Link href='/myKudos'>click here</Link> to view your Kudos.</p>
              </div>
              :
              <div>
                <h2 className="ontario-callout__title ontario-h5">Welcome to Kudos!</h2>
                <p className={styles.paragraph}><strong>{kpi.recent}</strong> Kudos created in the past 30 days, <strong>{kpi.total}</strong> Kudos created in total. </p>
                <p className={styles.paragraph}>Just take a few seconds to play, <Link href='/login'>click Login</Link> and you are ready to play!</p>
              </div>
            }

        </div>

        <div className={styles.entryBtnGroup}>
          <div className={styles.btnBox}>
            <Link href='/giveKudos' className="ontario-button ontario-button--primary">Create New Kudo</Link>
            <p className={styles.infoText}>Here you can customize and create your own special kudos from variety of templates </p>
          </div>

          <div className={styles.btnBox}>
            <Link href='/myKudos' className="ontario-button ontario-button--secondary">Check My Kudos</Link>
            <p className={styles.infoText}>Here you can check out those Kudos you just sent or received from other colleagues </p>
          </div>

        </div>
      </div>

    </main>
  )
}
