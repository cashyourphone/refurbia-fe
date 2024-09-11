import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { baseUrl, version } from '@/config/config';
import { ArrowBack, Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { IconButton, InputAdornment } from '@mui/material';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    maxWidth: '800px',
    maxHeight: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'row',
    p: 0,
    overflowY: 'auto',
};

const PhoneLoginModal = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [checked, setChecked] = useState(false);
    const [step, setStep] = useState(1);
    const [isEmailExist, setEmailExist] = useState(true);
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();
    useEffect(() => {
        setStep(1)
    },[open])

    const handlePhoneSubmit = async () => {
        // Simulate API call to check if the phone number exists
        const response = await fetch(`${baseUrl}/${version}/check-number/${phoneNumber}`);

        const data = await response.json();

        if (data.isExist) {
            setEmailExist(data.email)
            setStep(2)
        } else {
            setStep(2);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (event:any) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: `${baseUrl}/${version}/sign-in`, credentials:{ mobileNumber: phoneNumber, email: email, password: password }})
        });
        const data = await response.json();
        if (data.data) {
            localStorage.setItem('access_token', data.data.access_token);
            onClose()
        }
    }

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleSubmit}>
            <Box sx={modalStyle}>
                {/* Left Side */}
                <div className="hidden md:flex w-2/4 bg-background text-white flex-col justify-center items-center p-4">
                    <h2 className="text-4xl font-bold mb-4">Login/Signup</h2>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-3/4 bg-white p-8 flex flex-col ">
                    <div className='flex justify-between'>
                        <span onClick={() => setStep(1)} className={step === 1 ? 'invisible' : 'hover:cursor-pointer'}><ArrowBack /></span>
                        <span className="hover:cursor-pointer" onClick={onClose}><Close /></span>
                    </div>
                    <div className='flex flex-col h-full justify-center'>
                        {step === 1 && (
                            <>
                                <h3 className="text-2xl font-semibold mb-6">Enter your Phone Number</h3>
                                <TextField
                                    fullWidth
                                    label="Enter your Mobile"
                                    variant="outlined"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    InputProps={{
                                        startAdornment: <span className="text-gray-400 mr-2">+91</span>,
                                    }}
                                />
                                <div className="flex items-center mt-4">
                                    <Checkbox
                                        checked={checked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        color="primary"
                                    />
                                    <span className="text-sm">
                                        I agree to the{' '}
                                        <a onClick={() => router.push('/legal?policy=tnc')} className="text-primary hover:cursor-pointer">Terms and Conditions</a> &{' '}
                                        <a onClick={() => router.push('/legal?policy=privacy')} className="text-primary hover:cursor-pointer">Privacy Policy</a>
                                    </span>
                                </div>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    disabled={!checked || !phoneNumber}
                                    onClick={handlePhoneSubmit}
                                    className="mt-4"
                                >
                                    Continue
                                </Button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h3 className="text-2xl font-semibold mb-6">Create an Account</h3>
                                <TextField
                                    fullWidth
                                    label="Enter your Email"
                                        variant="outlined"
                                        name='email'
                                    className={isEmailExist ? 'hidden' : 'mb-4'}
                                />
                                <TextField
                                    fullWidth
                                    label="Enter your Password"
                                        variant="outlined"
                                        name='password'
                                    type={showPassword ? "text" : "password"}
                                    className="mb-4"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    className="mt-4"
                                    type='submit' 
                                >
                                    Login/Sign Up
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                </Box>
            </form>
        </Modal>
    );
};

export default PhoneLoginModal;
