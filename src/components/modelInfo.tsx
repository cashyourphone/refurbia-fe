'use client'
import { Box, CardMedia, CardContent, Card, Divider, Typography } from "@mui/material";
import { FC, useState } from "react";
import DynamicBreadcrumb from "./breadcrumb";
import GetQuote from "./getQuote";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setMobileData, setOrderData } from "@/app/slice/orderSlice";


interface ModelProps {
    data: any;
    modelName: string;
    questions: any;
    handleSubmit: (value: any) => Promise<{status:number, data:any}>;
}

const ModelComponent: FC<ModelProps> = ({ data, modelName, handleSubmit, questions }) => {
    const [quoteData, setQuoteData] = useState<{ status: number, data: any }>()
    const dispatch = useAppDispatch()
    const orderSelector = useAppSelector((state)=> state.order.orderData)

    const handleQuestionSubmit = async (value: any) => {
        const getExactQuoteData = await handleSubmit(value?.answers)
        setQuoteData(getExactQuoteData)
        dispatch(setOrderData({
            imei: value?.imei,
            ...orderSelector,
            exactQuote: getExactQuoteData?.data?.exactQuote
        }))
        dispatch(setMobileData(data));
    }
    
    return (
        <>
            <div className='container mx-auto p-4 md:p-0'>
                <DynamicBreadcrumb />
                <Typography className='text-primary text-2xl font-bold py-3'>{decodeURIComponent(modelName).toUpperCase()}</Typography>
                <Card className="mb-5" sx={{ margin: 'auto', boxShadow: 3 }}>
                    <Box className="flex flex-col items-center justify-center p-5 md:flex-row">
                        <CardMedia
                            component="img"
                            height="140"
                            className="w-5/12 md:w-auto"
                            image={data.productImage}
                            alt={modelName}
                        />
                        <CardContent>
                            <Typography variant="h6" className="text-center" component="div" gutterBottom>
                                {decodeURIComponent(modelName)}
                            </Typography>
                            <Typography variant="body2" className="text-center" color="textSecondary" gutterBottom>
                                {data.variantName} | Release Year: {data.releaseYear}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            {
                                quoteData?.status === 200 ?
                                    <Typography variant="body1" className="text-primary text-center">
                                        Best quote: &#8377;{quoteData?.data.exactQuote?.toFixed(2)}
                                    </Typography>
                                    : <Typography variant="body1" className="text-primary text-center">
                                        Get upto: &#8377;{data.quoteValue?.toFixed(2)}
                                    </Typography>
                            }
                            <Divider sx={{ my: 2 }} />
                            <Typography className="text-center text-xs" color="textSecondary">
                                Please note that the displayed price may vary depending on the condition of the device. We will give you a final quote after a thorough device inspection.
                            </Typography>
                            <div className="flex p-4 justify-center">
                                <GetQuote questions={questions} handleSubmit={handleQuestionSubmit} brandName={data?.brandName} isQuoteAvailable={quoteData?.status === 200} />
                            </div>
                        </CardContent>
                    </Box>
                </Card>
            </div>
        </>
    )
}

export default ModelComponent;