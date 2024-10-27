import ProfileComponent from "@/components/profile";
import { baseUrl, version } from "@/config/config";
import { decodeJwt } from "@/utils/jwtVerify";
import { cookies } from "next/headers";
import { FC } from "react";
import { UserDetails } from "../type";

const Profile: FC = async () => {
    const cookie = cookies();
    const tokenObj = cookie.get('token');
    const decodeValue = decodeJwt(tokenObj?.value as string)
    const userDetails = await fetch(`${baseUrl}/${version}/user-details/${decodeValue.userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenObj?.value}`
        },
    })
    const userDetailsObj = await userDetails.json();
    const orderDetails = await fetch(`${baseUrl}/${version}/get-all-orders/${decodeValue.userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenObj?.value}`
        },
    })
    const orderDetailsObj = await orderDetails.json()
    const updateUserDetails = async (value: UserDetails) => {
        'use server';
        const updateUserDetails = await fetch(`${baseUrl}/${version}/edit-user/${decodeValue.userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenObj?.value}`
            },
            body: JSON.stringify(value)
        })

        return await updateUserDetails.json()
    }

    const cancelOrder = async (orderId: string) => {
        'use server'
        const orderUpdate = await fetch(`${baseUrl}/${version}/update-order/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenObj?.value}`
            },
            body: JSON.stringify({status:'Cancelled'})
        })

        return await orderUpdate.json()
    }

    return (
        <ProfileComponent userDetails={userDetailsObj.data}
            handleUserDetails={updateUserDetails}
            handleOrderUpdate={cancelOrder}
            orders={orderDetailsObj.data} />
    )
}

export default Profile