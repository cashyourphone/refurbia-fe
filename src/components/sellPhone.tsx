'use client';
import { setOrderData } from "@/app/slice/orderSlice";
import { Address, MobileDetails, OrderData } from "@/app/type";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails, TextField, Typography, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';

const NoSpinnerTextField = styled(TextField)({
    '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '& input[type="number"]': {
        MozAppearance: 'textfield',
    },
});

interface SellMobileProps {
    handleOrderCreate: (order: OrderData) => Promise<void>
}

interface PaymentDetails {
    paymentMethod: string;
    upiId: string;
}

export interface AddressForm {
    name: string;
    address: string;
    landmark: string;
    locality: string;
    pincode: string;
}

const SellMobileComponent: FC<SellMobileProps> = ({ handleOrderCreate }) => {
    const [payment, setPayment] = useState<PaymentDetails>({ upiId: "", paymentMethod: 'cash' });
    const [address, setAddress] = useState<AddressForm>({ name: "", address: "", locality: "", landmark: "", pincode: "" });
    const [expanded, setExpanded] = useState<string | false>('addressPanel');
    const router = useRouter()
    const dispatch = useAppDispatch();
    const mobileSelector = useAppSelector((state) => state?.mobile?.mobileData);
    const orderSelector = useAppSelector((state) => state?.order?.orderData);

    useEffect(() => {
        setAddress({...orderSelector?.address , pincode:address?.pincode?.toString()}as AddressForm);
    }, [])

    const handleAccordionChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleAddressChange = (e: any) => {
        setAddress({
            ...address,
            [e?.target?.name]: e?.target?.value,
        });
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPayment({
            ...payment,
            [e?.target?.name]: e?.target?.value,
        });
    };

    const handleAddressSubmit = () => {
        dispatch(setOrderData({
            address: {...address, pincode: parseInt(address.pincode)},
            mobileDetails: mobileSelector as MobileDetails,
            ...orderSelector
        }))
        setExpanded('paymentPanel')
    };

    const handleSellNow = async () => {
        const orderDetails: OrderData = {
            ...orderSelector,
            paymentDetails: payment
        }

        const orderResponse: any = await handleOrderCreate(orderDetails);
        if (orderResponse?.status === 200) {
            router.push('/order')
        }

    }

    return (
        <>
            <h1 className="text-2xl font-bold p-5">You are almost done</h1>
            <div className="flex flex-col lg:flex-row w-full p-4 lg:gap-6 gap-4">
                {/* Left Section: Product Details */}
                <div className="lg:w-1/3 w-full bg-white shadow-md rounded-md p-4">
                    <img src={mobileSelector?.productImage} alt={mobileSelector?.productName} className="w-full rounded-md" />
                    <div className="mt-4">
                        <Typography variant="h6" className="font-bold">{mobileSelector?.brandName}</Typography>
                        <Typography variant="body1" className="py-3">{mobileSelector?.productName} - {mobileSelector?.variantName}</Typography>
                        <hr />
                        <Typography variant="h6" className="text-secondary font-medium py-3 text-center">Price summary</Typography>
                        <hr />
                        <div className="mt-2 text-secondary font-medium py-3 px-5 flex justify-between">
                            <Typography>Quote Price: </Typography>
                            <span>₹{orderSelector?.exactQuote}</span>
                        </div>
                    </div>
                </div>

                {/* Right Section: Accordion for Address and Payment Details */}
                <div className="lg:w-2/3 w-full">
                    {/* Address Accordion */}
                    <Accordion expanded={expanded === 'addressPanel'} onChange={handleAccordionChange('addressPanel')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" className="font-semibold">Address Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="flex flex-col gap-4">
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={address?.name}
                                    onChange={handleAddressChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Address"
                                    name="address"
                                    value={address?.address}
                                    onChange={handleAddressChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Landmark (optional)"
                                    name="landmark"
                                    value={address?.landmark}
                                    onChange={handleAddressChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Locality (optional)"
                                    name="locality"
                                    value={address?.locality}
                                    onChange={handleAddressChange}
                                    fullWidth
                                />
                                <TextField
                                    label="Pincode"
                                    name="pincode"
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            maxLength: 6,
                                            pattern: "\\d*"
                                        },
                                    }}
                                    value={address?.pincode}
                                    onChange={handleAddressChange}
                                    fullWidth
                                />
                                <Button disabled={!(address?.address && address?.name && address?.pincode?.length === 6)} variant="contained" color="primary" onClick={handleAddressSubmit}>
                                    Save Address
                                </Button>
                            </div>
                        </AccordionDetails>
                    </Accordion>

                    {/* Payment Accordion */}
                    <Accordion className="mt-4" expanded={expanded === 'paymentPanel'} onChange={handleAccordionChange('paymentPanel')}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" className="font-semibold">Payment Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="flex flex-col gap-4">
                                {/* Radio buttons for payment method */}
                                <FormLabel component="legend">Payment Method</FormLabel>
                                <RadioGroup
                                    aria-label="payment-method"
                                    name="paymentMethod"
                                    value={payment.paymentMethod}
                                    onChange={handlePaymentChange}
                                >
                                    <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                                    <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                                </RadioGroup>

                                {/* Show UPI ID field if UPI is selected */}
                                {payment.paymentMethod === 'upi' && (
                                    <TextField
                                        label="UPI ID"
                                        name="upiId"
                                        value={payment.upiId}
                                        onChange={handlePaymentChange}
                                        fullWidth
                                    />
                                )}

                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className="flex p-5 flex-col">
                        <Button disabled={payment.paymentMethod === 'upi' && payment.upiId === ''} variant="contained" onClick={handleSellNow}>Sell Now</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellMobileComponent;