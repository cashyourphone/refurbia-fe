'use client';
import { Box, Button, Divider, Drawer, FormControlLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Radio, RadioGroup, Slide, Step, StepLabel, Stepper, TextField } from "@mui/material";
import { AwaitedReactNode, FC, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import LoginModal from "./loginModal";
import { isLoggedIn } from "@/utils/auth";
import { Close } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useRouter } from "next/navigation";

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
    questions: any,
    handleSubmit: (value: any) => Promise<void>;
    isQuoteAvailable: boolean,
    brandName: string
}

const GetQuote: FC<GetQuoteProps> = ({ questions = [], isQuoteAvailable, handleSubmit, brandName }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [questionNumber, setQuestionNumber] = useState(0);
    const [imei, setImeiNumber] = useState('');
    const router = useRouter()

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleGetQuote = () => {
        if (!isLoggedIn()) {
            handleOpenModal()
        } else {
            setDrawerOpen(true)
        }
    }

    const handleNext = () => {
        if (activeStep <= questions.length) {
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
    };

    const handleImeaChange = (value: any) => {
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
        await handleSubmit({ answers, imei })
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
                        {questions.map((q: any, index: number) => (
                            <Step key={q.questionId}>
                                <StepLabel>{index + 1}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <div className="relative mt-8 h-60 overflow-hidden">
                        {/* This box holds all the questions and slides them */}
                        <Box
                            sx={{
                                display: 'flex',
                                transition: 'transform 0.2s ease-in-out',
                                transform: `translateX(-${activeStep * 100}%)` // Moves the active question into view
                            }}
                        >
                            {questions.map((question: any, index: number) => (
                                <div key={index} className="w-full flex-shrink-0">
                                    <h3 className="text-lg border-primary border-dashed border-2 p-2 text-center font-bold">{question.question}</h3>
                                    <RadioGroup
                                        className="p-6 pt-3"
                                        value={answers[question.questionId] || ''}
                                        onChange={(e) => handleAnswerChange(question.questionId, e.target.value)}
                                        onClick={handleNext}
                                    >
                                        {question.options.map((option: string, idx: number) => (
                                            <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
                                        ))}
                                    </RadioGroup>
                                </div>
                            ))}
                            {
                                questionNumber === questions.length &&
                                <div key={questionNumber + 1} className="w-full flex-shrink-0">
                                    <h3 className="text-lg border-primary border-dashed border-2 p-2 text-center font-bold">Enter your IMEA number</h3>
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
                                        onChange={(e) => handleImeaChange(e?.target?.value)}
                                        fullWidth
                                        placeholder="Enter youe IMEA number"
                                        variant="outlined"
                                        className="mt-8"
                                        helperText="Dial *#06# into your phone dialpad to get your IMEA"
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
                        {activeStep === questions.length && (
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