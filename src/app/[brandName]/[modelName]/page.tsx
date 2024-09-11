import DynamicBreadcrumb from "@/components/breadcrumb";
import GetQuote from "@/components/getQuote";
import { baseUrl, version } from "@/config/config";
import { Box, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { FC } from "react";
import { cookies } from "next/headers";
import ModelComponent from "@/components/modelInfo";

interface ModleProps {
    params: {
        modelName: string;
    };
    searchParams: {
        id: string
    }
}

const Model: FC<ModleProps> = async ({ params, searchParams }) => {
    let questions;
    let quoteData:any;
    const { modelName } = params;
    const response = await fetch(`${baseUrl}/${version}/mobile/phone-details/${searchParams?.id}`);
    const { data } = await response.json();
    const cookie = cookies();
    const tokenObj = cookie.get('token');
    if (!!tokenObj?.value) {
        const questionResponse = await fetch(`${baseUrl}/${version}/all-questions?userType=customer`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${tokenObj?.value}`
            }
        })

        const questionData = await questionResponse.json()
        questions = questionData.data
    }
    const handleSubmit = async(value:any) => {
        'use server';
        const answersArray = Object.entries(value).map(([questionId, choosedOption]) => ({
            questionId,
            choosedOption
        }));

        const exactQuoteResposne = await fetch(`${baseUrl}/${version}/get-final-quote`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenObj?.value}`
            },
            body: JSON.stringify({ initialQuote: data.quoteValue, answers: answersArray})
        })

       return await exactQuoteResposne.json();
    }
    return (
        <ModelComponent modelName={modelName} data={data} handleSubmit={handleSubmit} questions={questions} />
    )
}


export default Model;