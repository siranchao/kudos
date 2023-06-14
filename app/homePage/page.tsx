'use client';
import MainGrid from '../components/MainGrid';
import ScrollButton from '../components/ScrollButton';
import { Metadata } from 'next';
import styles from '../styles/homePage.module.css';
import InfoCard from '../components/InfoCard';
import { useEffect, useState } from 'react';
 
export const metadata: Metadata = {
  title: 'Kudos | Showcase',
  description: 'View All Kudos Page',
};

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
        <div className={styles.kudosHomePage}>
            <br />
            {kudos.length > 0 ? 
            <MainGrid kudos={kudos}/>
            :
            <InfoCard info={"No Kudos can be found at the moment, please try again later. Or try to create a new kudo"}/>}
    
            <ScrollButton />
        </div>
    )
}