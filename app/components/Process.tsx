'use client';
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
import { kudoAtom } from '@/store';
import Loader from './Loader';
import { useSession } from 'next-auth/react';

const randomColor = () => {
    const colorList: string[] = ["#CD0000", "#118847", "#FFD440", "#1080A6", "#551A8B", "#009ADB"]
    return colorList[Math.floor(Math.random() * colorList.length)]
}

interface User {
    _id: string;
    username: string;
    email: string;
    __v: number;
}

const fetcher = async (url: string, accessToken: string) => {
    const response = await fetch(url, {
      headers: {
        Authorization: accessToken,
      },
    });
    const data: any = await response.json();
    const users: User[] = data.data;

    if (!response.ok) {
      throw new Error(data.error);
    }

    return users;
};



export default function Process() {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API}/user/allUsers`, (url: string) => fetcher(url, session?.user?.accessToken as string))

    const { data: session } = useSession();

    //Kudo State for Context
    const steps: string[] = ['Select Receiver', 'Choose a Gif', 'Send Your Message'];
    const date: string = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
    const [activeStep, setActiveStep] = useState(0);
    const [kudo, setKudo] = useAtom(kudoAtom);


    const addMessage = (newMessage: string[]) => {
        setKudo({
            ...kudo,
            message: newMessage
        });
    }

    const onGifClick = (newGif: any, e: any) => {
        e.preventDefault();
        setKudo({
            ...kudo,
            gif: newGif
        });
    }

    const addReceiver = (name: string) => {
        setKudo({
            ...kudo,
            receiver: [...kudo.receiver, name]
        })
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
        setKudo({
            ...kudo,
            gif: null,
            receiver: [],
            message: []
        })
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <h3>Create New Kudo: Step {activeStep+1}</h3>
            <br />
            {isLoading ? <Loader /> :
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ pb: 3 }}>
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
                                            { session?.user?.name ? session?.user?.name[0] : ""}
                                        </Avatar>
                                    }
                                    title={session?.user?.name}
                                    subheader={String(date)}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        Send Kudos to {kudo.receiver.map((item, index) =>
                                            <strong key={index}>@{item}  </strong>
                                        )}
                                    </Typography>

                                </CardContent>
                                {kudo.gif && (
                                    <Gif style={{ display: "block", margin: "0 auto" }} gif={kudo.gif} width={250} />
                                )
                                }
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
                            </Card>
                        </div>
                    </div>
                </Box >
            }
        </>
    )
}