'use client';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from '../styles/homePage.module.css';
import KudoCard from "./KudoCard"

export default function MainGrid({ kudos }: any) {

    return (
        <>
            <div className={styles.searchBar}>
                <div>
                        <Select
                            id="select-option"
                            labelId="select-option-lable"
                            // value={option}
                            sx={{ m: 1, minWidth: 120 }}
                            //onChange={handleSlectChange}
                        >
                            <MenuItem value="Sender">Sender</MenuItem>
                            <MenuItem value="Receiver">Receiver</MenuItem>
                            <MenuItem value="Message">Message</MenuItem>
                        </Select>

                        <TextField
                            id="input-search"
                            label="Search"
                            placeholder="Search"
                            sx={{ m: 1, width: 300, minWidth: 120 }}
                            //onChange={handleinputChange}
                        />
                </div>

                <div>
                        <Select
                            id="select-option"
                            //value={sort}
                            //onChange={handleSortChange}
                            sx={{ m: 1, minWidth: 150 }}
                        >
                            <MenuItem value="Newest">Newest to Oldest</MenuItem>
                            <MenuItem value="Oldest">Oldest to Newest</MenuItem>
                            <MenuItem value="mostLiked">Most Liked</MenuItem>
                        </Select>
                </div>
            </div>
            <div className={styles.kudosGrid}>
                {kudos.map((kudo: any, index: number) => (
                   <KudoCard key={index} kudo={kudo} />
                ))}
            </div>
        </>

    )
}