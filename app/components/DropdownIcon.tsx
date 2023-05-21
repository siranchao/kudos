'use client'

import * as React from 'react';
import { FaBars } from 'react-icons/fa'
import styles from "../styles/header.module.css"
import Link from 'next/link';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import OutboxIcon from '@mui/icons-material/Outbox';
import CollectionsIcon from '@mui/icons-material/Collections';
import ApiIcon from '@mui/icons-material/Api';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


type Anchor = 'top' | 'left' | 'bottom' | 'right';
type ItemStyle = {
    textDecoration: string,
    color: string,
}
const listItemStyle: ItemStyle = {
    textDecoration: 'none',
    color: '#1a1a1a'
}

export default function DropdownIcon() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
          if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
              (event as React.KeyboardEvent).key === 'Shift')
          ) {
            return;
          }
          setState({ ...state, [anchor]: open });
        };
    
      const list = (anchor: Anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
              <ListItem>
                <ListItemButton>
                  <ListItemText primary="Welcome to Kudos!" sx={{textAlign: 'center'}}/>
                </ListItemButton>
              </ListItem>

              <Link href='/' style={listItemStyle}>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
              </Link>

              <Link href='/' style={listItemStyle}>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Kudos" />
                    </ListItemButton>
                </ListItem>
              </Link>

              <Link href='/' style={listItemStyle}>
                <ListItem>
                    <ListItemButton>
                    <ListItemIcon>
                        <OutboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Give Kudos" />
                    </ListItemButton>
                </ListItem>
              </Link>

              <Link href='/' style={listItemStyle}>
                <ListItem>
                    <ListItemButton>
                    <ListItemIcon>
                        <CollectionsIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Kudos" />
                    </ListItemButton>
                </ListItem>
              </Link>

              <Link href='/' style={listItemStyle}>
                <ListItem>
                    <ListItemButton>
                    <ListItemIcon>
                        <ApiIcon/>
                    </ListItemIcon>
                    <ListItemText primary="About Us" />
                    </ListItemButton>
                </ListItem>
              </Link>
          </List>
          <Divider />
          <List>
              <Link href='/' style={listItemStyle}>
                <ListItem>
                    <ListItemButton>
                    <ListItemIcon>
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log in" />
                    </ListItemButton>
                </ListItem>
              </Link>
            
              <Link href='/' style={listItemStyle}>
                <ListItem>
                    <ListItemButton>
                    <ListItemIcon>
                        <AppRegistrationIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign up" />
                    </ListItemButton>
                </ListItem>
              </Link>

              <ListItem>
                <ListItemButton>
                  <ListItemText secondary="Version: 1.0.0.0" sx={{textAlign: 'right'}}/>
                </ListItemButton>
              </ListItem>
          </List>
        </Box>
      );


    return (
        <>
            <div className={styles.menuIcon} onClick={toggleDrawer('right', true)}> <FaBars /></div>
            
            <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
            >
                {list('right')}
            </Drawer>
        </>
    )
}