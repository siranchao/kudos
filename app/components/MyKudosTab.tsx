'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from '../styles/myKudos.module.css'
import InfoCard from './InfoCard';
import KudoCard from "./KudoCard"


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        className={styles.tabPanel}
      >
        {value === index && (
            <div>{children}</div>
        )}
      </div>
    );
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function MyKudosTab({ kudos }: any) {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

  

    return (
        <Box sx={{ width: '100%', mb: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" 
                variant="scrollable"
                centered 
                scrollButtons
                allowScrollButtonsMobile>
                    <Tab label="Sent" {...a11yProps(0)} />  
                    <Tab label="Received" {...a11yProps(1)} />
                    <Tab label="Liked" {...a11yProps(2)} />
                    <Tab label="Collection" {...a11yProps(3)} />
                </Tabs>
            </Box>
        <TabPanel value={value} index={0}>
            {kudos.sent.length === 0 ? <InfoCard info={"You have not sent any kudos yet"} className={styles.infoCard}/> 
            :
            <div className={styles.grid}>
                {kudos?.sent.map((kudo: any, index: number) => (
                    <KudoCard key={index} kudo={kudo} />               
                ))}
            </div>}
        </TabPanel>

        <TabPanel value={value} index={1}>
            {kudos.received.length === 0 ? <InfoCard info={"You did not receive any kudos yet"} className={styles.infoCard}/> 
            : 
            <div className={styles.grid}>
                {kudos?.received.map((kudo: any, index: number) => (
                    <KudoCard key={index} kudo={kudo} />               
                ))}
            </div>}
        </TabPanel>

        <TabPanel value={value} index={2}>
            {kudos.liked.length === 0 ? <InfoCard info={"You have not liked any kudos yet"} className={styles.infoCard}/> 
            : 
            <div className={styles.grid}>
                {kudos?.liked.map((kudo: any, index: number) => (
                    <KudoCard key={index} kudo={kudo} />               
                ))}
            </div>}
        </TabPanel>

        <TabPanel value={value} index={3}>
            {kudos.collected.length === 0 ? <InfoCard info={"You have not collected any kudos yet"} className={styles.infoCard}/> 
            : 
            <div className={styles.grid}>
            {kudos?.collected.map((kudo: any, index: number) => (
                <KudoCard key={index} kudo={kudo} />               
            ))}
        </div>}
        </TabPanel>

      </Box>
    );
}