'use client';
import { Box, Button, Drawer, FormControlLabel,  Radio, RadioGroup, Step, StepLabel, Stepper, TextField } from "@mui/material";
import {  FC, useState } from "react";
import LoginModal from "./loginModal";
import { Close } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

const NoSpinnerTextField = styled(TextField)({
    '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '& input[type="number"]': {
        MozAppearance: 'textfield',
    },
});

interface GetQuoteProps {
    getAllQuestions: (token:string|null)=> Promise<[]>,
    handleSubmit: (value: any) => Promise<void>;
    isQuoteAvailable: boolean,
    brandName: string
}

const GetQuote: FC<GetQuoteProps> = ({ getAllQuestions, isQuoteAvailable, handleSubmit, brandName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [allQuestions, setAllQuestions] = useState([]);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [questionNumber, setQuestionNumber] = useState(0);
    const [imei, setImeiNumber] = useState('');
    const router = useRouter()
    const authSelector = useAppSelector((state) => state.auth)

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleGetQuote = () => {
        if (!authSelector.isAuthenticated) {
            handleOpenModal()
        } else {
            if (allQuestions.length === 0) {
                getAllQuestions(authSelector.token).then(question => {
                    setAllQuestions(question)
                }).catch(err => {
                    console.log(err)
                })
            }
            setDrawerOpen(true)
        }
    }

    const handleNext = () => {
        if (activeStep <= allQuestions?.length-1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setQuestionNumber(prev => prev + 1)
            
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setQuestionNumber(prev => prev - 1)
    };

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers({ ...answers, [questionId]: answer });
        if (activeStep <= allQuestions?.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setQuestionNumber(prev => prev + 1)
            setAllQuestions(
                (prevQuestions: any) =>
                    prevQuestions.map(((ques: any) =>
                        questionId === ques.questionId ? { ...ques, isAnswered: true } : ques
                    ))
            )

        }
    };

    const handleImeiChange = (value: any) => {
        setImeiNumber(value)
    }

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(open)
    };
    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;

        if (value.length > 15) {
            target.value = value.slice(0, 15); // Limit to 15 digits
        }
    };

    const handleSubmitClick = async () => {
        await handleSubmit({ answers, imei, token: authSelector.token })
        setDrawerOpen(false)
    }


    return (
        <>
            {isQuoteAvailable ?
                <Button variant="contained" onClick={() => router.push(`/${brandName}/sell`)}>Sell your phone now</Button>
                : <Button variant="contained" onClick={handleGetQuote}>Get quote for your device</Button>}
            <Drawer
                anchor={'right'}
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', customMd: '50%' },
                    }
                }}
            >
                <div className="flex justify-end pr-8 py-5">
                    <Close className="hover:cursor-pointer" onClick={toggleDrawer(false)} />
                </div>
                <div className="w-full p-8">
                    {/* Stepper */}
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {allQuestions?.map((q: any, index: number) => (
                            <Step key={q.questionId}>
                                <StepLabel>{index + 1}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <div className="relative mt-8 h-60 overflow-hidden">
                        <Box
                            sx={{
                                display: 'flex',
                                transition: 'transform 0.2s ease-in-out',
                                transform: `translateX(-${activeStep * 100}%)` // Moves the active question into view
                            }}
                        >
                            {allQuestions?.map((question: any, index: number) => (
                                <div key={index} className="w-full flex-shrink-0">
                                    <h3 className="text-lg border-primary border-dashed border-2 p-2 text-center font-bold">{question.question}</h3>
                                    <RadioGroup
                                        className="p-6 pt-3"
                                        value={answers[question.questionId] || ''}
                                        onChange={(e) => handleAnswerChange(question.questionId, e.target.value)}
                                    >
                                        {question.options.map((option: string, idx: number) => (
                                            <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
                                        ))}
                                    </RadioGroup>
                                </div>
                            ))}
                            {
                                questionNumber === allQuestions?.length &&
                                <div key={questionNumber + 1} className="w-full flex-shrink-0">
                                    <h3 className="text-lg border-primary border-dashed border-2 p-2 text-center font-bold">Enter your IMEI number</h3>
                                    <NoSpinnerTextField
                                        type="number"
                                        InputProps={{
                                            inputProps: {
                                                maxLength: 15, // Note: This doesn't work with type="number" in all browsers
                                                pattern: "\\d*", // Allows only digits
                                            },
                                        }}
                                        onInput={handleInput}
                                        value={imei}
                                        onChange={(e) => handleImeiChange(e?.target?.value)}
                                        fullWidth
                                        placeholder="Enter youe IMEI number"
                                        variant="outlined"
                                        className="mt-8"
                                        helperText="Dial *#06# into your phone dialpad to get your IMEI"
                                    />
                                </div>

                            }
                        </Box>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-4">
                        <Button variant="contained" color="primary" disabled={activeStep === 0} onClick={handleBack}>
                            Back
                        </Button>
                        {
                            allQuestions?.[activeStep]?.['isAnswered'] && (
                                <Button variant="contained"  color="primary" onClick={()=> handleNext()}>
                                    Next
                                </Button>
                            )
                        }
                        {activeStep === allQuestions?.length && (
                            <Button variant="contained" disabled={imei.length !== 15} color="primary" onClick={handleSubmitClick}>
                                Submit
                            </Button>
                        )}
                    </div>
                </div>
            </Drawer>
            <LoginModal open={isModalOpen} onClose={handleCloseModal} />
        </>
    )
}

export default GetQuote;