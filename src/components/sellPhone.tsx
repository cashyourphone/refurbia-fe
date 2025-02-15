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
    bankDetails: {
        bankName: string,
        accountNumber: string,
        accountName: string,
        ifscCode: string
    }
}

export interface AddressForm {
    name: string;
    address: string;
    landmark: string;
    locality: string;
    pincode: string;
    mobileNumber: string;
}

const SellMobileComponent: FC<SellMobileProps> = ({ handleOrderCreate }) => {
    const [payment, setPayment] = useState<PaymentDetails>({
        upiId: "", paymentMethod: 'cash',
        bankDetails: {
            bankName: '',
            accountNumber: '',
            accountName: '',
            ifscCode: ''
        }
    });
    const [address, setAddress] = useState<AddressForm>({ name: "", address: "", locality: "", landmark: "", pincode: "", mobileNumber:"" });
    const [expanded, setExpanded] = useState<string | false>('addressPanel');
    const router = useRouter()
    const dispatch = useAppDispatch();
    const mobileSelector = useAppSelector((state) => state?.mobile?.mobileData);
    const orderSelector = useAppSelector((state) => state?.order?.orderData);

    useEffect(() => {
        setAddress({...orderSelector?.address , pincode:address?.pincode?.toString(), mobileNumber: address?.mobileNumber?.toString()}as AddressForm);
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
        const { name, value } = e.target;
        if (name === 'paymentMethod') {
            setPayment({
                ...payment,
                paymentMethod: value,
                upiId: value === 'upi' ? payment.upiId : '', // Clear UPI ID if switching to bank
                bankDetails: value === 'bank' ? payment.bankDetails : {bankName:'',accountName:'',accountNumber:'',ifscCode:''} // Clear bank details if switching to UPI
            });
        } else if (payment.paymentMethod === 'upi') {
            setPayment({
                ...payment,
                upiId: value
            });
        } else if (payment.paymentMethod === 'bank') {
            setPayment(prev => ({
                ...prev,
                bankDetails: {
                    ...prev.bankDetails,
                    [name]: value
                }
            }));
        }
        
    };

    const handleAddressSubmit = () => {
        dispatch(setOrderData({
            ...orderSelector,
            address: { ...address, pincode: parseInt(address.pincode), mobileNumber: parseInt(address.mobileNumber) },
            mobileDetails: mobileSelector as MobileDetails,
        }))
        setExpanded('paymentPanel')
    };

    const handleSellNow = async () => {
        const orderDetails: OrderData = {
            ...orderSelector,
            paymentDetails: payment.bankDetails.accountName ? {bankDetails: payment.bankDetails} : {upiId: payment.upiId}
        }
        const orderResponse: any = await handleOrderCreate(orderDetails);
        if (orderResponse?.status === 200) {
            router.push('/order')
        }

    }

    const checkSellNowDisabled = () => {
        let result = true
        if (address && address.address && address.pincode.length === 6 && address.mobileNumber.length === 10 &&
            (payment.upiId !== '' || (payment.bankDetails.accountName !== '' && payment.bankDetails.accountNumber !== '' && payment.bankDetails.bankName !== '' && payment.bankDetails.ifscCode !== ''))
        ) {
           result = false
        }
        return result
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
                                <TextField
                                    label="Mobile Number"
                                    name="mobileNumber"
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            maxLength: 10,
                                            pattern: "\\d*"
                                        },
                                    }}
                                    value={address?.mobileNumber}
                                    onChange={handleAddressChange}
                                    fullWidth
                                />
                                <Button disabled={!(address?.address && address?.name && address?.pincode?.length === 6 && address?.mobileNumber?.length === 10)} variant="contained" color="primary" onClick={handleAddressSubmit}>
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
                                    <FormControlLabel value="bank" control={<Radio />} label="Bank Transfer" />
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
                                {payment.paymentMethod === 'bank' && (
                                    <>
                                    <TextField
                                        label="Bank name"
                                        name="bankName"
                                        value={payment.bankDetails.bankName}
                                        onChange={handlePaymentChange}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Account number"
                                        name="accountNumber"
                                        value={payment.bankDetails.accountNumber}
                                        onChange={handlePaymentChange}
                                        fullWidth
                                        />
                                        <TextField
                                            label="IFSC code"
                                            name="ifscCode"
                                            value={payment.bankDetails.ifscCode}
                                            onChange={handlePaymentChange}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Account name"
                                            name="accountName"
                                            value={payment.bankDetails.accountName}
                                            onChange={handlePaymentChange}
                                            fullWidth
                                        />
                                    </>
                                )}

                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <div className="flex p-5 flex-col">
                        <Button
                            disabled={
                                checkSellNowDisabled()
                            } variant="contained" onClick={handleSellNow}>Sell Now</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellMobileComponent;