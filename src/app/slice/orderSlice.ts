// src/app/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MobileDetails, OrderData } from '../type';


interface OrderState {
    orderData: OrderData | null;
}

interface MobileState {
    mobileData: MobileDetails | null;
}

const initialOrderState: OrderState = {
    orderData: null,
};

const initialMobileState: MobileState = {
    mobileData: null,
};



const orderSlice = createSlice({
    name: 'order',
    initialState: initialOrderState,
    reducers: {
        setOrderData: (state, action: PayloadAction<OrderData>) => {
            state.orderData = {...state.orderData,...action.payload};
        },
        cleaOrderData: (state) => {
            state.orderData = null;
        },
    },
});

const mobileSlice = createSlice({
    name: 'mobile',
    initialState: initialMobileState,
    reducers: {
        setMobileData: (state, action: PayloadAction<MobileDetails>) => {
            state.mobileData = {...state.mobileData,...action.payload};
        },
        cleaMobileData: (state) => {
            state.mobileData = null;
        },
    },
});

export const { setOrderData, cleaOrderData } = orderSlice.actions;
export const { setMobileData, cleaMobileData } = mobileSlice.actions;
export default { orderSlice, mobileSlice }
