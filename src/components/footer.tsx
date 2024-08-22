
"use client";
import { FC } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Business, ContactMail, Phone } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function Copyright() {
    return (
        <Typography variant="body2" className="text-white flex justify-center" mt={1}>
            {'Copyright © '}
            <span>Refurbia&nbsp;</span>
            {new Date().getFullYear()}
        </Typography>
    );
}

const Footer: FC = () => {
    const router = useRouter()
    return (
        <div
            className="bg-background flex text-center custom-sm:text-left flex-col gap-4 items-center p-8 text-white"
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: '100%',
                    gap: {xs:2, sm:5}
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        minWidth: { xs: '100%', sm: '40%' },
                    }}
                >
                    <Box sx={{ width: '100%' }}>
                        <Box className="flex justify-center custom-sm:justify-start" >
                            <img
                                width={250}
                                src={
                                    '/playstore.webp'
                                }
                                alt="logo of sitemark"
                            />
                        </Box>
                        <Typography className="text-2xl block" variant="body2" fontWeight={600} gutterBottom>
                            Contacts
                        </Typography>
                        <Stack id="contacts" spacing={2} useFlexGap>
                            <div className="flex gap-3 justify-center custom-sm:justify-start">
                                <span className="flex items-center"><Business /></span>
                                <span>
                                    Eftychia Technologies Pvt Ltd,<br />
                                    Lady Ratan Complex, D.S. Marg,<br />
                                    Opp Municipal IND Estate<br />
                                    Worli, Mumbai 400018
                                </span>
                            </div>
                            <hr />
                            <span><ContactMail />&nbsp;&nbsp; support@refurbia.in</span>
                            <hr />
                            <span><Phone />&nbsp;&nbsp; +91-9768111637</span>
                        </Stack>
                    </Box>
                </Box>
                <span className="custom-sm:hidden"><hr /></span>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography className="text-xl" variant="body2" fontWeight={600}>
                        Product
                    </Typography>
                    <Link onClick={() => router.push('/')} className="hover:cursor-pointer  text-white no-underline">
                        Sell
                    </Link>
                    <Link onClick={() => router.push('/fnq')} className="hover:cursor-pointer  text-white no-underline">
                        FAQs
                    </Link>
                </Box>
                <span className="custom-sm:hidden"><hr /></span>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography className="text-xl" variant="body2" fontWeight={600}>
                        Company
                    </Typography>
                    <Link className="hover:cursor-pointer  text-white no-underline">
                        Careers
                    </Link>
                    <Link className="hover:cursor-pointer  text-white no-underline">
                        Press
                    </Link>
                </Box>
                <span className="custom-sm:hidden"><hr /></span>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography className="text-xl" variant="body2" fontWeight={600}>
                        Legal
                    </Typography>
                    <Link onClick={()=>{router.push('/legal?policy=tnc')}} className="hover:cursor-pointer  text-white no-underline">
                        Terms and condition
                    </Link>
                    <Link onClick={() => router.push('/legal?policy=privacy')} className="hover:cursor-pointer  text-white no-underline">
                        Privacy policy
                    </Link>
                    <Link onClick={() => router.push('/legal?policy=refund')} className="hover:cursor-pointer  text-white no-underline" >
                        Return and Refund policy
                    </Link>
                    <Link onClick={() => router.push('/legal?policy=shipping')} className="hover:cursor-pointer  text-white no-underline" >
                        Shipping policy
                    </Link>
                    <Link onClick={() => router.push('/legal?policy=warranty')} className="hover:cursor-pointer  text-white no-underline" >
                        Warranty policy
                    </Link>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 2,
                    width: '100%',
                    borderTop: '1px solid',
                    borderColor: 'white',
                }}
            >
                <Copyright />

            </Box>
        </div>
    );
}

export default Footer;