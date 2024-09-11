import { FC } from 'react';
import DynamicBreadcrumb from '@/components/breadcrumb';
import { baseUrl, version } from '@/config/config';
import { Box, Typography } from '@mui/material';
import BrandGrid from '@/components/brandGrid';
import BrandSearch from '@/components/brandSearch';

interface BrandProps {
    params: {
        brandName: string;
    };
    searchParams?: {
        query?: string;
    };
}

const Brand: FC<BrandProps> = async ({ params ,searchParams}) => {
    const { brandName } = params;
    const response = await fetch(`${baseUrl}/${version}/mobile/get-by-brand/${brandName}`);
    const { data } = await response.json();
    const filterData = searchParams?.query ? data.filter((phone: any) => {
        const name = phone.modelVariant.toLowerCase()
       return name.includes(searchParams?.query?.toLowerCase())
    }) : data 
    
    return (
        <>
            <div className='container mx-auto p-4 md:p-0'>
                <DynamicBreadcrumb />
                <div className='py-3 md:flex items-center justify-between'>
                    <Typography className='text-primary text-2xl font-bold'>{brandName.toUpperCase()}</Typography>
                    <div className='mt-2 md:mt-0'>
                        <BrandSearch />
                    </div>
                </div>
                <Typography className='text-xl'>Select Model</Typography>
            <Box
                className="mt-6"
                id="image"
                sx={{
                    display: 'grid',
                    mt: { xs: 8, sm: 10 },
                    mb: 10,
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gridAutoRows: 'minmax(100px, auto)',
                    gap: 2,
                    alignSelf: 'center',
                    height: 'auto',
                    width: '100%',

                }}
            >
                {filterData.map((phone: any) => (
                    <BrandGrid key={phone._id} phone={ phone} />
                ))}
                </Box>
            </div>
        </>
    );
};

export default Brand;
