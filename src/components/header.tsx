"use client";
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Collapse, AppBar, Button, Chip } from '@mui/material';
import { Dropdown } from 'antd';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import LoginModal from './loginModal';
import { isLoggedIn } from '@/utils/auth';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { logout } from '@/app/slice/orderSlice';




const Header: FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const isHome = pathname === '/';
    const authSelector = useAppSelector((state)=> state.auth)

    useEffect(() => {
        const loggedInStatus = authSelector.isAuthenticated;
        setLoggedIn(loggedInStatus);
    }, [authSelector.isAuthenticated])
    
    const handleClick = () => {
        setIsOpen(prev => !prev)
        setIsAboutOpen(false)
    }

    const handleAboutClick = () => {
        setIsAboutOpen(prev => !prev)
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        router.replace('/')
        setLoggedIn(false)
    }

    const items: any = [
        {
            key: '1',
            label: (
                <a onClick={() => router.push('/fnq')} rel="noopener noreferrer" >
                    FAQ
                </a>
            )
        },
        {
            key: '2',
            label: (
                <a onClick={() => router.push('/legal?policy=tnc')} rel="noopener noreferrer" >
                    Terms and Conditions
                </a>
            )
        },
        {
            key: '3',
            label: (
                <a onClick={() => router.push('/legal?policy=privacy')} rel="noopener noreferrer" >
                    Privacy Policy
                </a>
            )
        },
        {
            key: '4',
            label: (
                <a onClick={() => router.push('/legal?policy=refund')} target="_blank" rel="noopener noreferrer" >
                    Return and Refund policy
                </a>
            )
        },
        {
            key: '5',
            label: (
                <a onClick={() => router.push('/legal?policy=shipping')} target="_blank" rel="noopener noreferrer" >
                    Shipping policy
                </a>
            )
        },
        {
            key: '6',
            label: (
                <a onClick={() => router.push('/legal?policy=warranty')} target="_blank" rel="noopener noreferrer" >
                    Warranty policy
                </a>
            )
        }
    ]

    const getLoginProfileButton = () => {
        if (loggedIn) {
            return (<Chip onClick={() => router.push('/profile')} label="Profile" className='text-white w-20 border-white' variant="outlined" />)
        } else {
            return (<Chip onClick={handleOpenModal} label="Login" className='text-white w-20 border-white' variant="outlined" />)
        }
    }

    return (
        <AppBar
            position="fixed"
            className='bg-complex-gradient z-50'
            sx={{
                boxShadow: 0,
            }}>
            <nav className="container mx-auto items-center py-4 px-6 md:flex">
                <div className='flex justify-between w-full'>
                    <div onClick={()=> router.push('/')} className="flex items-center hover:cursor-pointer">
                        <Image src="/icon.png" width={50} height={50} alt="App Icon" />
                        <span className="text-2xl text-primary font-bold">₹efurbia</span>
                    </div>
                    <div className="md:hidden flex">
                        <button onClick={handleClick} className="flex flex-col justify-center items-center">
                            <span className={`bg-white block transition-transform duration-300 ease-out h-0.5 w-6 rounded-sm 
                            ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                            <span className={`bg-white block transition-opacity duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 
                            ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`bg-white block transition-transform duration-300 ease-out h-0.5 w-6 rounded-sm 
                            ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                        </button>
                    </div>
                </div>
                <Collapse className='md:h-auto md:flex md:items-center visible md:overflow-visible' in={isOpen}>
                    <ul className="flex items-end justify-center flex-col md:items-center md:flex-row md:space-x-6">
                        {!isHome && <li className='pt-2 md:pt-0'><a onClick={() => router.push('/')} className="text-white pt-2 hover:cursor-pointer md:pt-0 hover:text-primary hover:font-medium underline underline-offset-8">Sell</a></li>}
                        <li className='pt-2 md:pt-0'>
                            <Dropdown className='hidden md:block' menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                                <span className="text-white hover:cursor-pointer hover:text-primary hover:font-medium text-nowrap underline underline-offset-8"> About us </span>
                            </Dropdown>
                            <span onClick={handleAboutClick} className="text-white flex justify-end md:hidden hover:text-primary hover:font-medium text-nowrap underline underline-offset-8">{!isAboutOpen ? <ExpandMore /> : <ExpandLess />} About us</span>
                            <Collapse className='md:hidden' in={isAboutOpen}>
                                <ul className="flex pr-2 justify-center items-end flex-col md:flex-row md:space-x-6">
                                    {items.map((i: { key: any; label: any; }) => <li key={i.key} className=" pt-2 text-white hover:text-primary hover:font-medium underline underline-offset-8">{i.label}</li>)} 
                                </ul>
                            </Collapse>
                        </li>
                        <li className='pt-2 md:pt-0'><a href="#contacts" className="text-white hover:text-primary hover:font-medium underline underline-offset-8">Contact</a></li>
                        <li className='pt-4 md:pt-0'>{
                             getLoginProfileButton()   
                        }</li>
                       {loggedIn && <li className='pt-4 md:pt-0'>{
                            <Chip onClick={handleLogout} label="Log Out" className='text-white w-20 border-white' variant="outlined" />
                        }</li>}
                    </ul>
                </Collapse>
                <LoginModal open={isModalOpen} onClose={handleCloseModal} />
                {/* <div className={`overflow-hidden md:overflow-visible md:max-h-10 ${isOpen ? 'max-h-40 transition-all duration-500 ease-in-out' : 'max-h-0 '} `}>
                    <ul className="flex items-end justify-center flex-col md:flex-row md:space-x-6">
                        <li><a  className="text-white hover:text-primary hover:font-medium">Sell</a></li>
                        <li><a href="#about" className="text-white hover:text-primary hover:font-medium text-nowrap">About us</a></li>
                        <li><a href="#contact" className="text-white hover:text-primary hover:font-medium">Contact</a></li>
                    </ul>
                </div> */}
            </nav>
        </AppBar>
    );
};

export default Header;
