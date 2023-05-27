import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Gif } from "@giphy/react-components";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import SearchName from "./Steps/SearchName";
import GifGrid from './Steps/GifGrid';
import Message from './Steps/Message';
import useSWR from 'swr'
import { useAtom } from 'jotai'
import { receiverAtom, gifIdAtom, newMessageAtom, senderAtom } from '../../store'

async function fetcher(input: RequestInfo, init: RequestInit, ...args: any[]) {
    const res = await fetch(input, init);
    return res.json();
}

const randomColor = () => {
    const colorList: string[] = ["#CD0000", "#118847", "#FFD440", "#1080A6", "#551A8B", "#009ADB"]
    return colorList[Math.floor(Math.random() * colorList.length)]
}


export default function Process() {
    const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher)

    //Kudo State for Context
    const steps: string[] = ['Select Receiver', 'Choose a Gif', 'Send Your Message'];
    const date: string = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
    const [activeStep, setActiveStep] = useState(0);

    const [gif, setGif] = useState<any>()

    const [receiver, setReceiver] = useAtom(receiverAtom);
    const [gifId, setGifId] = useAtom(gifIdAtom);
    const [newMessage, setNewMessage] = useAtom(newMessageAtom);
    const [sender, setSender] = useAtom(senderAtom);

    const addMessage = (message: string[]) => {
        setNewMessage(message)
    }

    const onGifClick = (gif: any, e: any) => {
        e.preventDefault();
        setGif(gif);
        setGifId(gif.id);
    }

    const addReceiver = (name: string) => {
        setReceiver([...receiver, name]);
    }

    //switch from different components
    const SwitchStages = ({ activeStep, addMessage, addReceiver, onGifClick }: any) => {
        switch (activeStep) {
            case 0:
                return <SearchName addReceiver={addReceiver} users={data}/>
            case 1:
                return <GifGrid onGifClick={onGifClick} />
            case 2:
                return <Message addMessage={addMessage} />
            case 3:
                return <Message />
            default:
                return <p>Error</p>
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        window.scrollTo({
            top: 200,
            left: 0,
            behavior: 'smooth'
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setReceiver([]);
        setGif("");
        setNewMessage([]);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
        <h3>Create New Kudo: Step {activeStep+1}</h3>
        <hr />
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const stepProps: any = {};
                    const labelProps: any = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <SwitchStages activeStep={activeStep} addMessage={addMessage} addReceiver={addReceiver} onGifClick={onGifClick} />

            {activeStep === steps.length - 1 ?
                (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1, fontWeight: 'bold' }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button sx={{ fontWeight: 'bold' }} onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) :
                (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1, fontWeight: 'bold' }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />                       
                            <Button sx={{ fontWeight: 'bold' }} onClick={handleNext}>
                                Next
                            </Button>
                        </Box>
                    </React.Fragment>
                )
            }

            <div >
                <hr />
                <h3>Preview</h3>
                <div>
                    <Card sx={{ maxWidth: 345, boxShadow: 10, m: '0 auto', mb: 4 }} className="d-flex flex-column">
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: randomColor() }} aria-label="recipe">
                                    {sender ? sender[0] : ""}
                                </Avatar>
                            }
                            title={sender}
                            subheader={String(date)}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Send Kudos to {receiver.map((item, index) =>
                                    <strong key={index}>@{item}  </strong>
                                )}
                            </Typography>

                        </CardContent>
                        {gif && (
                            <Gif style={{ display: "block", margin: "0 auto" }} gif={gif} width={250} />
                        )
                        }
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                            {newMessage.map((item, index) => {
                                if (newMessage.length === 1) {
                                    return <span key={index}><strong>&quot;{item}&quot;</strong><br/></span>
                                }
                                else {
                                    if(index === 0) {
                                        return <span key={index}><strong>&quot;{item}</strong><br/></span>
                                    } else if(index === newMessage.length - 1) {
                                        return <span key={index}><strong>{item}&quot;</strong><br/></span>
                                    } else {
                                        return <span key={index}><strong>{item}</strong><br/></span>
                                    }
                                }
                            })
                            }
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </Box >
        </>
    )
}