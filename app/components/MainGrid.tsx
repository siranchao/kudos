'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/homePage.module.css';
import KudoCard from "./KudoCard"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loader from './Loader';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import InfoCard from './InfoCard';

const splitKudos = (kudos: any[], perPage: number) => {
    const result: any[][] = [];
    for (let i = 0; i < kudos.length; i += perPage) {
        result.push(kudos.slice(i, i + perPage));
    }
    return result;
}

export default function MainGrid({ kudos }: any) {

    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [displayList, setDisplayList] = useState<any[][]>(splitKudos(kudos, 12));

    //filter states
    const [searchOption, setSearchOption] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [perPage, setPerPage] = useState(12);
    const [warning, setWarning] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
    };

    const handleSort = (option: string) => {
        setLoading(true);
        const kudosList: any[] = [...kudos];
        switch (option) {
            case "Newest":
                kudosList.sort((a: any, b: any) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                })
                break;
            case "Oldest":   
                kudosList.sort((a: any, b: any) => {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                })
                break;
            case "mostLiked":   
                kudosList.sort((a: any, b: any) => {
                    return b.likes - a.likes;
                })
                break;
            default:
                break;
        }
        setDisplayList(splitKudos(kudosList, perPage));
        setSortOption(option);
        setLoading(false);
    }

    const handleSearch = () => {
        setLoading(true);
        setWarning(false);
        let kudoList: any[] = [];

        if (searchOption === "Sender") {
            kudoList = kudos.filter((item: any) => {
                return item.sender.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
            });
        }
        if (searchOption === "Receiver") {
            kudoList = kudos.filter((item: any) => {
                return item.receiver.toString().toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
            });
        }
        if (searchOption === "Message") {
            kudoList = kudos.filter((item: any) => {
                return item.message.toString().toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
            });
        }
        if(kudoList.length === 0){
            setWarning(true);
        } else {
            setDisplayList(splitKudos(kudoList, perPage));
        }
        setLoading(false);
    }

    const handleReset = () => {
        setLoading(true);
        setCurrentPage(1);
        setSearchOption("");
        setSearchValue("");
        setSortOption("");
        setPerPage(12);
        setWarning(false);
        setDisplayList(splitKudos(kudos, 12));
        setLoading(false);
    }

    return (
        <>
            <div >
                <div className={styles.searchBar}>
                    <FormControl>
                        <InputLabel id="search-option">Search By</InputLabel>
                        <Select
                            id="search-option"
                            labelId="search-option-lable"
                            value={searchOption}
                            label="Search By"
                            sx={{ mr: 1, minWidth: 120 }}
                            onChange={(event: any) => { setSearchOption(event.target.value) }}
                        >
                            <MenuItem value="Sender">Sender</MenuItem>
                            <MenuItem value="Receiver">Receiver</MenuItem>
                            <MenuItem value="Message">Message</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        id="input-search"
                        label="Keyword"
                        placeholder="Keyword"
                        value={searchValue}
                        sx={{ width: 300, minWidth: 120, mr: 1 }}
                        onChange={(event: any) => { setSearchValue(event.target.value) }}
                    />
                    <Button variant="contained" size='small' sx={{ height: 30, mr: 1 }} onClick={handleSearch}>Search</Button>
                    <Button variant="outlined" size='small' sx={{ height: 30 }} onClick={handleReset}>Reset</Button>

                </div>
                <div className={styles.filterBar}>
                    <FormControl>
                        <InputLabel id="select-option">Sort By</InputLabel>
                        <Select
                            labelId="select-option"
                            id="select-option"
                            value={sortOption}
                            label="Sort By"
                            onChange={ (event: any) => { handleSort(event.target.value) }}
                            sx={{ minWidth: 120, mr: 1 }}
                        >
                            <MenuItem value="Newest">Newest to Oldest</MenuItem>
                            <MenuItem value="Oldest">Oldest to Newest</MenuItem>
                            <MenuItem value="mostLiked">Most Liked</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="page-option">Per Page</InputLabel>
                        <Select
                            labelId="page-option"
                            id="page-option"
                            value={perPage}
                            label="Per Page"
                            onChange={ (event: any) => { setPerPage(parseInt(event.target.value)); setDisplayList(splitKudos(kudos, parseInt(event.target.value))); }}
                            sx={{ minWidth: 100 }}
                        >
                            <MenuItem value="12">12</MenuItem>
                            <MenuItem value="28">28</MenuItem>
                            <MenuItem value="48">48</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            {loading ? <Loader /> :
            <>
                {warning ? <InfoCard info="Ops! No kudos can be found" /> :
                <>
                    <div className={styles.kudosGrid}>
                        {displayList[currentPage - 1].map((kudo: any, index: number) => (
                        <KudoCard key={index} kudo={kudo} />
                        ))}
                    </div>     
                    <br/>
                    <div className={styles.paginationBar}>
                        <Stack spacing={2}>
                            <Pagination 
                                count={displayList.length}
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
            }
        </>
    )
}