"use client";
import * as React from 'react';
import { Divider, Grid, alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { TypeAnimation } from 'react-type-animation';
import { AltRoute, ExpandMore } from '@mui/icons-material';
import Image from 'next/image';
import { baseUrl, s3BaseUrl, version } from '@/config/config';
import Search from '@/components/search'

const Hero: React.FC = () => {
    const brandImageName = ['apple', 'samsung', 'google', 'oneplus'];
    const [allBrands, setAllBrands] = React.useState([]);

    React.useEffect(() => {
        fetch(`${baseUrl}/${version}/mobile/get-brands`)
            .then((res) => res.json())
            .then((data: any) => {
                const resBrand = data.data.map((brand: { id: any; name: any; code: any; }) => {
                    return {
                        id: brand.id,
                        name: brand.name,
                        code: brand.code
                    }
                })
                setAllBrands(resBrand);
            });
    }, [])
    
    const scrollToSection = (id:any) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box
            id="hero"
            sx={{
                width: '100%',
            }}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                    
                        <TypeAnimation
                            sequence={[
                                'Best market value',
                                1500, 
                                'Get instant quote',
                                1500,
                                'One day pick up',
                                1500,
                                `Receive instant payment`,
                                1500
                            ]}
                            className='text-primary'
                            wrapper="span"
                            speed={5}
                            style={{
                                display: 'inline-block',
                                alignSelf: 'center',
                                textAlign: 'center',
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)', }}
                            repeat={Infinity}
                        />
      
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
                    >
                        we are dedicated to making technology accessible and sustainable. We buy old phones and give them a new life.
                    </Typography>
                    <Stack
                        className='md:w-full'
                        direction={{ xs: 'column', sm: 'row' }}
                        alignSelf="center"
                        justifyContent="center"
                        spacing={1}
                        useFlexGap
                        sx={{ pt: 2, width: '100%' }}
                    >
                        <Search className="w-full"/>
                        {/* <TextField
                            id="outlined-basic"
                            className='w-full'
                            hiddenLabel
                            size="small"
                            variant="outlined"
                            aria-label="Search your phone"
                            placeholder="Search your phone"
                            sx={{
                                boxShadow: `0 0 12px 8px ${alpha('#CCC2DC', 0.4)}`
                            }}
                            inputProps={{
                                autoComplete: 'off',
                                'aria-label': 'Search your phone',
                            }}
                        /> */}
                    </Stack>
                    <Stack
                        className='w-1/2'
                        alignSelf="center"
                        color="text.secondary"
                    >
                        <span className='strikethrough self-center'>Choose a brand</span>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={3}
                        useFlexGap
                        justifyContent="center"
                    >
                        {brandImageName.map((img, ind) => (
                            <Box
                                key={ind}
                                className="hover:cursor-pointer"
                                sx={{
                                    backgroundSize: 'cover',
                                    borderRadius: '8px',
                                    outline: '1px dashed',
                                    outlineColor: '#6650a4',
                                    boxShadow: `0 0 8px 8px ${alpha('#CCC2DC', 0.5)}`
                                }}
                            >
                                <Image src={`${s3BaseUrl}/brand-images/${img}.jpg`} alt='brand-image' width={50} height={50} />
                            </Box>
                        ))}
                    </Stack>
                    <Stack
                        className='w-1/2 ransition-transform duration-300 animate-bounce'
                        alignSelf="center"
                        color="text.secondary"
                        lineHeight={0.8}
                    >
                        
                        <a onClick={() => scrollToSection('brands')} className='self-center hover:cursor-pointer text-shadow'>More brands</a>
                        <a onClick={()=>scrollToSection('brands')} className='self-center hover:cursor-pointer text-4xl'><ExpandMore className='self-center hover:cursor-pointer text-4xl' /></a>
                        
                    </Stack>
                </Stack>
            </Container>
            <Stack
                height='auto'
                width="100%"
                className='bg-background p-5'
                justifyContent="center"
            >
                <span className='text-white text-center bg-primary rounded-full flex self-center py-2 px-3 mb-6 text-3xl'>Just in 3 steps sell you phone</span>
                <Stack
                    direction={{ sm: 'column', md: 'row' }}
                    justifyContent="space-around"
                    spacing={{ xs: 5 }}
                >
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'

                        }}
                    >
                        <Box
                            className="w-fit"
                            sx={{
                                padding: 2,
                                background: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                border: '1px dashed #6650a4',
                                borderRadius: 999,
                            }}
                        >
                            <Image width={120} height={120} alt='quote' src={'/quote.png'} />
                        </Box>
                        <span className='text-white text-center  flex self-center py-2 px-3 text-lg'>Get best quote</span>
                        <span className='text-white text-center  flex self-center'>Answer few question and get an immediate buyback offer after a fast app check. Quick and easy!</span>
                    </Box>
                    <div className="flex items-baseline leading-cs-10  justify-center">
                        <span className='rotate-90 custom-md:rotate-0 inline-blocks text-nowrap'>{"--------->"}</span>
                    </div>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'

                        }}
                    >
                        <Box
                            className="w-fit"
                            sx={{
                                padding: 2,
                                background: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                border: '1px dashed #6650a4',
                                borderRadius: 999
                            }}
                        >
                            <Image width={120} height={120} alt='quote' src={'/pickup.png'} />
                        </Box>
                        <span className='text-white text-center  flex self-center py-2 px-3 text-lg'>Schedule pick up</span>
                        <span className='text-white text-center  flex self-center'>Select a preferred pickup location and time. We prioritize your convenience and will work with you to ensure a smooth and effortless process.</span>
                    </Box>
                    <div className="flex items-baseline leading-cs-10 justify-center">
                        <span className="rotate-90 custom-md:rotate-0 inline-blocks text-nowrap">{"--------->"}</span>
                    </div>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                            
                        }}
                    >
                        <Box
                            className="w-fit"
                            sx={{
                                padding: 2,
                                background: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                border: '1px dashed #6650a4',
                                borderRadius: 999
                            }}
                        >
                            <Image width={120} height={120} alt='quote' src={'/cash.png'} />
                        </Box>
                        <span className='text-white text-center  flex self-center py-2 px-3  text-lg'>Instant payment</span>
                        <span className='text-white text-center  flex self-center'>No need to wait get your payment before you pass over the phone. Select a direct bank transfer, cash or upi for a swift and secure process!</span>
                    </Box>
                </Stack>
            </Stack>
            <hr  className='mt-5'/>
            <div id="brands" className='my-5 flex text-center justify-center text-primary text-xl'>Brands we buy</div>
            <hr/>
            <Box
                className="container mx-auto mt-6"
                id="image"
                sx={(theme) => ({
                        display:'grid',
                    mt: { xs: 8, sm: 10 },
                        mb: 10,
                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                        gridAutoRows: 'minmax(100px, auto)',
                        gap: 2,
                        padding:4,
                        alignSelf: 'center',
                        height: 'auto',
                        width: '100%',
                        
                    })}
            >
                {allBrands.map((brand: any) => (
                    <Grid key={brand.id}>
                        <Box
                            key={brand.id}
                            className="hover:cursor-pointer"
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems:'center',
                                backgroundSize: 'cover',
                                flexDirection:'column',
                                borderRadius: '8px',
                                outline: '1px dashed',
                                outlineColor: '#6650a4',
                                boxShadow: `0 0 5px 5px ${alpha('#CCC2DC', 0.5)}`
                            }}
                        >
                            <Image alt='brand-image' width={100} height={100} src={`${s3BaseUrl}/brand-images/${brand.code}.jpg`} />
                        </Box>
                    </Grid>
                ))}
            </Box>
        </Box>
    );
}

export default Hero;