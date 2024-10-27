export interface MobileDetails {
    _id: string
    brandName: string
    productImage: string
    brandId: number
    variantName: string
    modelName: string
    releaseYear: string
    productName: string
    quoteValue: number
    currentPrice: number
    hasCharger: boolean
    hasPen: boolean
}

export interface Address {
    name: string;
    address: string;
    landmark: string;
    locality: string;
    pincode: number;
}

export interface PaymentDetails {
    upiId?: string;
    bankDetails?: {
        bankName: string,
        accountNumber: string,
        accountName: string,
        ifscCode: string
    }
}

export interface OrderData {
    userId?: string;
    mobileDetails?: MobileDetails;
    imei?: number;
    exactQuote?: number;
    address?: Address;
    paymentDetails?: PaymentDetails;
}

export interface UserDetails {
    name: string,
    mobileNumber: number,
    email: string
}