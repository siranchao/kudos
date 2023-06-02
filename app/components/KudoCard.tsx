
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useAsync } from "react-async-hook"
import { Gif } from "@giphy/react-components"
import { GiphyFetch } from "@giphy/js-fetch-api"
import styles from '../styles/homePage.module.css';



//Giphy API key
const gf: any = new GiphyFetch("pPpjPbnxhrccqEzHjNvYuQ7tW1JcCbsE")

const GifDisplay = (gifID: string) => {
    const [gif, setGif] = useState(null)
    useAsync(async () => {
        if (gifID !== null) {
            const { data } = await gf.gif(gifID)
            setGif(data)
        }
    }, [])

    return gif !== null && <Gif style={{ display: "block", margin: "0 auto" }} gif={gif} width={200} />
}

const randomColor = () => {
    const colorList = ["#CD0000", "#118847", "#FFD440", "#1080A6", "#551A8B", "#009ADB"]
    return colorList[Math.floor(Math.random() * colorList.length)]
}


export default function KudoCard( { kudo }: any) {
    const [likedBtn, setLikedBtn] = useState(false);
    const [thumbUpBtn, setThumbUpBtn] = useState(false);
    const [thumbUpNum, setThumbUpNum] = useState(kudo.likes)

    return (
        <Card sx={{ maxWidth: 345, boxShadow: 10 }} className="d-flex flex-column" >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: randomColor() }} aria-label="recipe">
                        {kudo.sender[0]}
                    </Avatar>
                }
                title={kudo.sender}
                subheader={kudo.createdAt.split('T')[0]}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Send Kudos to {kudo.receiver.map((name: string, index: number) => <strong key={index}>@{name}  </strong>)}
                </Typography>
            </CardContent>
            <CardContent>
                {/* <GifDisplay gifID={kudo.kudoGif} /> */}
                { GifDisplay(kudo.kudoGif) }
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                {kudo.message.map((item: string, index: number) => {
                                if (kudo.message.length === 1) {
                                    return <span key={index}><strong>&quot;{item}&quot;</strong><br/></span>
                                }
                                else {
                                    if(index === 0) {
                                        return <span key={index}><strong>&quot;{item}</strong><br/></span>
                                    } else if(index === kudo.message.length - 1) {
                                        return <span key={index}><strong>{item}&quot;</strong><br/></span>
                                    } else {
                                        return <span key={index}><strong>{item}</strong><br/></span>
                                    }
                                }
                            })}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className='mt-auto' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div className={styles.rowSection}>

                    <div className={styles.leftSection}>
                        <IconButton aria-label="like"
                            color={likedBtn === true ? "primary" : "default"}
                            //onClick={handleLikedClick}
                        >
                            <FavoriteIcon />
                        </IconButton>


                        <IconButton aria-label="share"
                            //onClick={handleShareClicked}
                        >
                            <ShareIcon />
                        </IconButton>
                    </div>

                    <IconButton aria-label="thumbUp"
                        color={thumbUpBtn === true ? "primary" : "default"}
                        //onClick={handleThumbUp}
                    >
                        <ThumbUpIcon />
                        {thumbUpNum > 0 && <span style={{ fontSize: '1.2rem', paddingLeft: '.5rem' }}>{thumbUpNum}</span>}
                    </IconButton>

                </div>
            </CardActions>
        </Card>
    )

}