'use client';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { FC } from 'react';

const DynamicBreadcrumb:FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const pathnames = pathname?.split('/').filter((x) => x);

    return (
        <Breadcrumbs className='py-5' separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/" onClick={() => router.push('/')}>
                Sell
            </Link>
            {pathnames?.map((value, index) => {
                const isLast = index === pathnames?.length - 1;
                const href = `/${pathnames.slice(0, index + 1).join('/')}`;

                return isLast ? (
                    <Typography className='text-primary' key={href}>
                        {capitalizeFirstLetter(decodeURIComponent(value))}
                    </Typography>
                ) : (
                    <Link underline="hover" color="inherit" href={href} onClick={() => router.push(href)} key={href}>
                            {capitalizeFirstLetter(decodeURIComponent(value))}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default DynamicBreadcrumb;
