'use client';
import { Container, Typography, Card, CardContent, CardMedia, Grid, Button, } from '@mui/material';
import { FC } from "react";
import { styled } from '@mui/system';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

const CustomCard = styled(Card)({
    padding: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
});


const OrderSummaryComponent: FC = () => {
    const router = useRouter()
    const mobileDetails = useAppSelector((state) => state?.mobile?.mobileData);
    const orderDetails = useAppSelector((state) => state.order.orderData);
    return (
        <Container>
            <Typography variant="h4" gutterBottom className="p-8">
                Order Summary
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <CustomCard className='items-center'>
                        <CardMedia
                            component="img"
                            image={mobileDetails?.productImage}
                            alt={mobileDetails?.productName}
                            style={{height:'auto', maxHeight:'250px', width:'fit-content'}}
                            
                        />
                        <CardContent>
                            <Typography variant="h5" component="div" className="text-xl text-primary md:text-2xl">
                                {mobileDetails?.productName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Brand:</strong> {mobileDetails?.brandName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Model:</strong> {mobileDetails?.modelName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Variant:</strong> {mobileDetails?.variantName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Release Year:</strong> {mobileDetails?.releaseYear}
                            </Typography>
                        </CardContent>
                    </CustomCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomCard>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom className="text-xl text-primary md:text-2xl">
                                Order Details
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Quote Price:</strong> ₹{orderDetails?.exactQuote}
                            </Typography>
                        </CardContent>
                    </CustomCard>
                    <CustomCard>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom className="text-xl text-primary md:text-2xl">
                                Name and Pick Up Address
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Name:</strong> {orderDetails?.address?.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Address:</strong> {orderDetails?.address?.address}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Locality:</strong> {orderDetails?.address?.locality}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Landmark:</strong> {orderDetails?.address?.landmark}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Pincode:</strong> {orderDetails?.address?.pincode}
                            </Typography>
                        </CardContent>
                    </CustomCard>
                    <div className="flex mb-4 flex-col">
                        <Button  variant="contained" onClick={()=> router.push('/')}>Back to home</Button>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default OrderSummaryComponent;