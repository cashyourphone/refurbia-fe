'use client';
import { alpha, Box, Grid } from "@mui/material";
import { Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react"

const BrandGrid: FC<any> = ({ phone }) => {
    const router = useRouter();
    const handleClick = () => {
        const params = new URLSearchParams({ id: phone._id });
        router.push(`/${phone.brandName.toLowerCase()}/${phone.modelName}?${params?.toString()}`);
    }
    return (
        <Grid key={phone.id}>
            <Box
                className="hover:cursor-pointer"
                sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundSize: 'cover',
                    flexDirection: 'column',
                    borderRadius: '8px',
                    outline: '1px dashed',
                    outlineColor: '#6650a4',
                    boxShadow: `0 0 5px 5px ${alpha('#CCC2DC', 0.5)}`
                }}
                onClick={handleClick}
            >
                <Image alt='brand-image' width={100} height={100} src={`${phone.productImage}`} />
                <Typography className="text-primary text-center p-2">{phone.modelVariant}</Typography>
            </Box>
        </Grid>
    )
}

export default BrandGrid