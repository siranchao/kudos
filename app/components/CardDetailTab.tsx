'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import styles from '../styles/homePage.module.css';
import SenderIcon from '@mui/icons-material/ThreeP';
import PeopleIcon from '@mui/icons-material/People';
import ShareIcon from '@mui/icons-material/Share';
import TextField from '@mui/material/TextField';
import TitleIcon from '@mui/icons-material/Feed';
import ProfileIcon from '@mui/icons-material/AccountBox';
import CodeIcon from '@mui/icons-material/Code';

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
          <Box sx={{ p: 2 }}>
            <Paper elevation={2}>{children}</Paper>
          </Box>
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


export default function CardDetailTab({ kudo }: any) {
    const [value, setValue] = useState(0);
    const embedValue = `<iframe src="${kudo.gif.embed_url}" width="384" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="${kudo.gif.url}">via GIPHY</a></p>`

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    function shareKudo() {
        navigator.clipboard.
            writeText(window.location.href)
            .then(() => {
                alert(window.location.href + "\n\nKudo Link Copied!")
            })
            .catch(() => {
                alert("Unable to copy URL, please try again")
            })
    }
    
    function embedGif() {
        navigator.clipboard.
        writeText(embedValue)
        .then(() => {
            alert("Link Copied to Clipboard!")
        })
        .catch(() => {
            alert("Unable to copy URL, please try again")
        })
    }


    if (typeof window !== "undefined") {
        return (
            <Box sx={{ width: '100%', mb: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                  <Tab label="Kudo Info" {...a11yProps(0)} />
                  <Tab label="GIPHY Info" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                    <List
                          sx={{ width: '100%', bgcolor: 'background.paper' }}
                          subheader={<ListSubheader>Kudo&apos;s Information</ListSubheader>}
                      >
                          <ListItem>
                              <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                <SenderIcon />
                              </ListItemIcon>
                              <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                <ListItemText id="sender" primary="Sent from:" sx={{flex: 1}}/>
                                <ListItemText id="senderName" secondary={kudo.sender} sx={{flex: 2}}/>
                              </div>
                          </ListItem>
                          <ListItem>
                              <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                <PeopleIcon/>
                              </ListItemIcon>
                              <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                <ListItemText id="receiver" primary="Sent to:"  sx={{flex: 1}}/>
                                <ListItemText id="senderName" secondary={[...kudo.receiver].join(', ')} sx={{flex: 2}}/>
                              </div>
                          </ListItem>
                          <ListItem>
                              <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                <ShareIcon />
                              </ListItemIcon>
                              <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                <ListItemText id="link" primary="Share Kudo:" sx={{flex: 1}}/>
                                <div style={{flex: 2}}><Button variant="contained" size='small' onClick={shareKudo} >Click to Copy</Button></div>
                              </div>
                          </ListItem>  
                          <ListItem sx={{display: 'flex'}}>
                              <ListItemText id="created" primary="Created at:" sx={{flex: 1}} />
                              <ListItemText id="lastUpdatedTime" secondary={new Date(kudo.createdAt).toLocaleString()} sx={{flex: 2}} />
                          </ListItem>
                          <ListItem sx={{display: 'flex'}}>
                              <ListItemText id="lastUpdated" primary="Last updated:" sx={{flex: 1}} />
                              <ListItemText id="lastUpdatedTime" secondary={new Date(kudo.updatedAt).toLocaleString()} sx={{flex: 2}} />
                          </ListItem>
                          <ListItem sx={{display: 'flex', justifyContent: 'flex-end', fontSize: '14px'}}>
                              <a href='#'>report this Kudo</a>
                          </ListItem>
                    </List>
              </TabPanel>
              <TabPanel value={value} index={1}>
                    <List
                          sx={{ width: '100%', bgcolor: 'background.paper' }}
                          subheader={<ListSubheader>Giphy&apos;s Information</ListSubheader>}
                      >
                          <ListItem>
                              <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                <TitleIcon />
                              </ListItemIcon>
                              <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                <ListItemText id="title" primary="GIF Name:" sx={{flex: 1}}/>
                                <ListItemText id="titleName" secondary={kudo.gif.title} sx={{flex: 2}}/>
                              </div>
                          </ListItem>
                          <ListItem>
                              <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                <ShareIcon/>
                              </ListItemIcon>
                              <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                <ListItemText id="gifUrl" primary="GIF URL:"  sx={{flex: 1}}/>
                                <a href={kudo.gif.bitly_url} target="_blank" style={{display: 'inline-block',textDecoration: 'none', fontSize: '13px', textAlign: 'left', flex: 2}}>{kudo.gif.bitly_url}</a>
                              </div>
                          </ListItem>
                          <ListItem>
                              <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                <ProfileIcon />
                              </ListItemIcon>
                              <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                <ListItemText id="uploader" primary="Author:" sx={{flex: 1}} />
                                <a href={kudo.gif.user.profile_url} target="_blank" style={{display: 'inline-block',textDecoration: 'none', fontSize: '13px', textAlign: 'left', flex: 2}}>{kudo.gif.user.display_name} (Click for more GIFs)</a>
                              </div>

                          </ListItem>
                          <ListItem>
                              <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CodeIcon />
                              </ListItemIcon>
                              <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                                <ListItemText id="embed" primary="Embed this GIF:" sx={{flex: 1}}/>
                                <TextField
                                    id="embedGif"
                                    value={embedValue}
                                    multiline
                                    disabled
                                    sx={{flex: 2}}
                                    />
                              </div>
                          </ListItem>  
                          <ListItem sx={{display: 'flex', justifyContent: 'flex-end', fontSize: '14px'}}>
                            <Button variant="contained" size='small' onClick={embedGif}>Copy</Button>
                          </ListItem>
                    </List>
              </TabPanel>
            </Box>
        );
    } else {
        return null;
    }
  

}


