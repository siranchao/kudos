'use client';
import MainGrid from '../components/MainGrid';
import ScrollButton from '../components/ScrollButton';
import styles from '../styles/homePage.module.css';
import InfoCard from '../components/InfoCard';
import { useEffect, useState } from 'react';
import Head from 'next/head';
 

export default async function Home() {
    const [kudos, setKudos] = useState([]);

    useEffect(() => {
      async function getData() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/allKudos`);
        const data = await res.json();
        const sortedData = data.data.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
        setKudos(sortedData);
      }
      getData()

    }, [])


    return (
      <>
            <Head>
                <title>Kudos | Showcase</title>
                <meta property="og:title" key="title" content="Kudos | Showcase" />
                <meta name="description" key='description' content="View All Kudos Page" />
                <meta name="viewport" key='viewport' content="width=device-width, initial-scale=1" />
            </Head>

            <div className={styles.kudosHomePage}>
            <br />
            {kudos.length > 0 ? 
            <MainGrid kudos={kudos}/>
            :
            <InfoCard info={"No Kudos can be found at the moment, please try again later. Or try to create a new kudo"}/>}
    
            <ScrollButton />
        </div>
      </>
    )
}