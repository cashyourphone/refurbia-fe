import * as jwt from 'jsonwebtoken';
export const decodeJwt = (token:string) => {
    const decode = jwt.decode(token);
    const userInfo = decode as { id: string; mobilenumber: string };
    return {userId : userInfo?.id, mobileNumber: userInfo?.mobilenumber};
}