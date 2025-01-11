'use client';
import { OrderData, UserDetails } from "@/app/type";
import { useAppSelector } from "@/lib/hooks";
import { isLoggedIn } from "@/utils/auth";
import { ExpandMore } from "@mui/icons-material";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Card, CardContent, CardMedia, Grid, } from "@mui/material";
import { Form, Input, notification } from "antd";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface OrdersList extends OrderData {
    _id: string;
    orderId: string;
    status: string;
}

interface Profile {
    userDetails: UserDetails,
    handleUserDetails: (value: UserDetails) => Promise<{ status: number, data: any, message: string }>,
    orders: OrdersList[],
    handleOrderUpdate: (orderId: string) => Promise<{ status: number, data: any, message: string }>
}

const ProfileComponent: FC<Profile> = ({userDetails, handleUserDetails, orders, handleOrderUpdate}) => {
    const [expanded, setExpanded] = useState<string | false>('account');
    const [changedValues, setChangedValues] = useState({});
    const [orderList, setOrderList]= useState(orders)
    const router = useRouter();
    const [form] = Form.useForm();
    const authSelector = useAppSelector((state) => state.auth)
    useEffect(() => {
        if (!authSelector.isAuthenticated) {
            router.replace('/')
        }  
        form.setFieldsValue({
            name: userDetails?.name,
            mobileNumber: userDetails?.mobileNumber,
            email: userDetails?.email
        })
    },[authSelector.isAuthenticated])
    const handleAccordionChange = (value: string) => {
        setExpanded(value)
    }
    const handleSubmit = () => {
        form.submit()
    }
    const handleValuesChange = (changed: UserDetails) => {
        setChangedValues(prevValues => ({ ...prevValues, ...changed }));
    };
    const handleCancelOrder = async (id:string) => {
        const orderUpdateDetails = await handleOrderUpdate(id)
        if (orderUpdateDetails.status === 200) {
            notification.info({
                message: 'Order',
                description: 'You order had been cancelled succesffuly!',
                placement: 'topRight'
            })
        } else {
            notification.error({
                message: 'Account',
                description: orderUpdateDetails.message,
                placement: 'topRight'
            })
        }
        setOrderList((prevOrders) =>
            prevOrders.map((order) =>
                order.orderId === id
                    ? { ...order, status: 'Cancelled' }
                    : order
            )
        );
    }
    const onFinish = async () => {
        const updatedDetails = await handleUserDetails(changedValues as UserDetails);
        if (updatedDetails.status === 200) {
            notification.info({
                message: 'Account',
                description: 'You details has been updated succesffuly!',
                placement: 'topRight'
            })
        } else {
            notification.error({
                message: 'Account',
                description: updatedDetails.message,
                placement:'topRight'
            })
        }
    }
    return (
        <Box sx={{ width: '100%', px:{xs: 2, md: 5}, mb:3, pt:2}}>
            <Accordion expanded={expanded === 'account'} onChange={()=>handleAccordionChange('account')}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>Account</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Form form={form} onFinish={onFinish} onValuesChange={handleValuesChange} className="px-8">
                        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name!' }]}>
                            <Input placeholder="Enter your name"/>
                        </Form.Item>
                        <Form.Item name="mobileNumber" label="Mobile Number" rules={[{ required: true, message: 'Please enter your mobile number!' }]}>
                            <Input placeholder="Enter your mobile number" />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email!' }]}>
                            <Input placeholder="Enter your email" />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 24 }}
                            style={{ textAlign: 'right' }}
                        >
                            <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
                        </Form.Item>
                    </Form>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'order'} onChange={() => handleAccordionChange('order')}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>My Orders</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{maxHeight:400, overflow:'scroll'}}>
                    <Box>
                        {orderList.map((order) => (
                            <Card key={order._id} sx={{ mb: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={4} sm={4} md={3}>
                                        <CardMedia
                                            component="img"
                                            image={order.mobileDetails?.productImage}
                                            alt={order.mobileDetails?.productName}
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                maxWidth: { sm: 150, md: 180 },
                                            }}
                                        />
                                        <Typography sx={{padding:1, textAlign:'center'}}>{order.mobileDetails?.productName + `(${order.mobileDetails?.variantName})`}</Typography>
                                    </Grid>
                                    <Grid item xs={8} sm={8} md={7}>
                                        <CardContent>
                                            <Typography><strong>Order ID:</strong> {order.orderId}</Typography>
                                            <Typography><strong>Get upto:</strong> {order.mobileDetails?.quoteValue}</Typography>
                                            <Typography><strong>Status:</strong> {order.status}</Typography>
                                            <Typography>
                                                <strong>Address:</strong> {order.address?.address}, {order.address?.locality}, {order.address?.pincode}
                                            </Typography>
                                            <Typography><strong>Payment:</strong> {order.paymentDetails?.upiId ? 'UPI payment' : 'Online bank transfer'}</Typography>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleCancelOrder(order.orderId)}
                                                disabled={order.status === 'Cancelled'}
                                                sx={{ mt: 2}}
                                            >
                                                {order.status === 'Cancelled' ? 'Order Cancelled' : 'Cancel Order'}
                                            </Button>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default ProfileComponent