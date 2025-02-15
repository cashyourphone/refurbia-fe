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
    const getAllQuestions = async (token:string|null) => {
        'use server'
        if (token) {
            const questionResponse = await fetch(`${baseUrl}/${version}/all-questions?userType=customer`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const questionData = await questionResponse.json()
            return questionData.data
        }
    }
    const handleSubmit = async(value:any, token:string) => {
        'use server';
        const answersArray = Object.entries(value).map(([questionId, choosedOption]) => ({
            questionId,
            choosedOption
        }));

        const exactQuoteResposne = await fetch(`${baseUrl}/${version}/get-final-quote`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ initialQuote: data.quoteValue, answers: answersArray})
        })

       return await exactQuoteResposne.json();
    }
    return (
        <ModelComponent modelName={modelName} data={data} handleSubmit={handleSubmit} getAllQuestions={getAllQuestions} />
    )
}


export default Model;