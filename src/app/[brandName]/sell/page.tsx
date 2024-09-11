import { OrderData } from "@/app/type";
import SellMobileComponent from "@/components/sellPhone";
import { baseUrl, version } from "@/config/config";
import { decodeJwt } from "@/utils/jwtVerify";
import { cookies } from "next/headers";
import { FC } from "react";

const SellMobile: FC = () => {
    const cookie = cookies();
    const tokenObj = cookie.get('token');
    const decodeValue = decodeJwt(tokenObj?.value as string)
    const orderCreate = async (orderDetails: OrderData) => {
        'use server'
        const orderCreateResponse = await fetch(`${baseUrl}/${version}/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenObj?.value}`
            },
            body: JSON.stringify({ ...orderDetails, userId: decodeValue.userId })
        });

        const data = await orderCreateResponse.json()
        return data
    }
    return (
        <SellMobileComponent handleOrderCreate={orderCreate}/>
    )
}

export default SellMobile;