'use client';
import { useState, useRef } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Gif } from "@giphy/react-components"
import styles from '../styles/homePage.module.css';
import { useSession } from 'next-auth/react';
import { likeKudo, dislikeKudo, collectKudo, disCollectKudo } from '../controller/kudo';

const randomColor = () => {
    const colorList = ["#CD0000", "#118847", "#FFD440", "#1080A6", "#551A8B", "#009ADB"]
    return colorList[Math.floor(Math.random() * colorList.length)]
}

export default function KudoCardDetail( { kudo }: any) {

    const {data: session} = useSession();
    const color = useRef(randomColor());

    const [collectBtn, setCollectBtn] = useState<boolean>(kudo.collects?.includes(session?.user?.id));
    const [likeBtn, setLikeBtn] = useState<boolean>(kudo.likes?.includes(session?.user?.id));
    const [likeNum, setLikeNum] = useState<number>(kudo.likes?.length);

    const handleCollectClicked = async () => {
        if (collectBtn === false) {
            await collectKudo(kudo._id, session?.user?.accessToken as string);
        } else {
            await disCollectKudo(kudo._id, session?.user?.accessToken as string);
        }
        setCollectBtn(!collectBtn)
    }

    const handleLikeClicked = async () => {
        let res: any = null;
        if (likeBtn === false) {
            res = await likeKudo(kudo._id, session?.user?.accessToken as string);
        } else {
            res = await dislikeKudo(kudo._id, session?.user?.accessToken as string);
        }
        setLikeBtn(!likeBtn)
    }

    const handleShareClicked = () => {
        navigator.clipboard.
            writeText(window.location.href)
            .then(() => {
                alert("Kudo Link Copied to Clipboard !")
            })
            .catch(() => {
                alert("Unable to copy URL, please try again")
            })
    }

    const warning = () => {
        alert("Please login or sign up to Kudos for more actions")
    }

    if (typeof window !== "undefined") {
        return (
            <Card sx={{ maxWidth: 345, boxShadow: 10, margin: '1rem auto' }} className="d-flex flex-column" >
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: color.current}} aria-label="recipe">
                            {kudo.sender[0]}
                        </Avatar>
                    }
                    title={kudo.sender}
                    subheader={kudo.createdAt.split('T')[0]}
                />
                <CardContent >
                    <Typography variant="body2" color="text.secondary">
                        Send Kudos to {kudo.receiver.map((name: string, index: number) => <strong key={index}>@{name}  </strong>)}
                    </Typography>
                </CardContent>
                <CardContent>
                    {kudo.gif !== null && <Gif style={{ display: "block", margin: "0 auto" }} gif={kudo.gif} width={200} />}
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
                            <Tooltip title="Collect">
                                <IconButton aria-label="collect"
                                    color={collectBtn ? "primary" : "default"}
                                    onClick={() => session ? handleCollectClicked() : warning() }
                                >
                                    <FavoriteIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Share">
                                <IconButton aria-label="share"
                                    onClick={ handleShareClicked }
                                >
                                    <ShareIcon />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <Tooltip title="Like">
                            <IconButton aria-label="thumbUp"
                                color={likeBtn ? "primary" : "default"}
                                onClick={ () => session ? handleLikeClicked() : warning()} 
                            >
                                <ThumbUpIcon />
                                {likeNum > 0 && <span style={{ fontSize: '1rem', paddingLeft: '.5rem' }}>{likeNum}</span>}
                            </IconButton>
                        </Tooltip>
                    </div>
                </CardActions>
            </Card>
        )
    } else {
        return null
    }


}