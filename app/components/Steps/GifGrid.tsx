'use client'
import { useState } from "react";
import { Grid } from "@giphy/react-components"
import { GiphyFetch } from "@giphy/js-fetch-api"
import ResizeObserver from "react-resize-observer";
import TextField from '@mui/material/TextField';
import styles from '@/app/styles/giveKudos.module.css'

////Giphy API key
const giphyFetch = new GiphyFetch(`${process.env.NEXT_PUBLIC_GIF_APIKEY}`)


export default function GifGrid({ onGifClick }: any) {

    const [keyword, setKeyword] = useState("");
    const [width, setWidth] = useState(window.innerWidth);

    const handleGiphySearch = (event: any) => {
        setKeyword(event.target.value)
    }

    const fetchGifs = (offset: any) => {
        if (keyword) {
            return giphyFetch.search(keyword, { offset, limit: 10 });
        } else {
            return giphyFetch.trending({ offset, limit: 10 });
        }
    }

    return (
        <>
            <div className={styles.searchKudo}>
                <h5 className={styles.searchLabel}>Select Your Gif</h5>

                <div className={styles.searchField}>
                    <TextField
                        id="giphy-search"
                        label="Keyword"
                        placeholder="Search Gif"
                        sx={{ m: 1, width: 300, minWidth: 100 }}
                        onChange={handleGiphySearch}
                        style={{
                            textAlign: `center`,
                        }}
                    />
                </div>
            </div>

            <div className={styles.gifGrid}>
                <Grid
                    key={keyword}
                    onGifClick={onGifClick}
                    fetchGifs={fetchGifs}
                    width={width}
                    columns={4}
                    gutter={6}
                />
                <ResizeObserver
                    onResize={({ width }: any) => {
                        setWidth(width);
                    }}
                />
            </div>
        </>
    )
}