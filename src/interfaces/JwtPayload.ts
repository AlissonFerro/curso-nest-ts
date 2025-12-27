import { Types } from "mongoose";

export interface JwtPayload {
    user: {
        sub: string;
        email?: string;
        tokenVersion: number;
        _id: Types.ObjectId
    }
    iat?: number;
    exp: number;
}