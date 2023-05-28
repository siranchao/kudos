import Banner from './components/Banner'
import Link from 'next/link'
import styles from './styles/home.module.css'
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Kudos | Home',
  description: 'Kudos Home Page',
};

export default function Home() {
  const isAuthenticated: boolean = false

  return (
    <main>
      <Banner/>

      <div className={styles.indexpageContent}>
        <div className="ontario-callout" style={{maxWidth: '90vw'}}>
            {isAuthenticated?
              <div>
                <h2 className="ontario-callout__title ontario-h5">Welcome to Kudos, xxxx</h2>
                <p className={styles.paragraph}><strong>xxxx</strong> Kudos created in the past 30 days, <strong>xxxx</strong> Kudos created in total. </p>
                <p className={styles.paragraph}>You can <a className={styles.link} >click here</a> to Logout the app.</p>
              </div>
              :
              <div>
                <h2 className="ontario-callout__title ontario-h5">Welcome to Kudos!</h2>
                <p className={styles.paragraph}><strong>xxxx</strong> Kudos created in the past 30 days, <strong>xxxxx</strong> Kudos created in total. </p>
                <p className={styles.paragraph}>No need to sign up, just <a className={styles.link}>click Login</a> and you are ready to play!</p>
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
