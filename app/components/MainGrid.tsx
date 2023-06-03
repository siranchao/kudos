'use client';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from '../styles/homePage.module.css';
import KudoCard from "./KudoCard"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PER_PAGE: number = 12;
const splitKudos = (kudos: any[]) => {
    const result: any[][] = [];
    for (let i = 0; i < kudos.length; i += PER_PAGE) {
        result.push(kudos.slice(i, i + PER_PAGE));
    }
    return result;
}

export default function MainGrid({ kudos }: any) {

    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [kudosList, setKudosList] = useState<any[][]>([]);

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setKudosList(splitKudos(kudos));
        setLoading(false);
    }, [kudos]);


    return (
        <>
            {/* <div className={styles.searchBar}>
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
            </div> */}
            {loading ? <div>Loading...</div> :
            <>
                <div className={styles.kudosGrid}>
                    {kudosList[currentPage - 1].map((kudo: any, index: number) => (
                    <KudoCard key={index} kudo={kudo} />
                    ))}
                </div>     
                <br/>
                <div className={styles.paginationBar}>
                    <Stack spacing={2}>
                        <Pagination 
                            count={kudosList.length}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            className={styles.paginationItem}
                        />
                    </Stack>
                </div>
            </>
            }


        </>

    )
}