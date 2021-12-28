import * as mongoose from 'mongoose';
import { SellerStatus } from './dto/getSellerfilter.dto';
export const SellerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    LGA: {type: String, required: true},
    phone: {type: Number, required: true}, 
    deal: {type: Number, required: true},
    status: {type: String, Enum:['COMPLETED' ,'PENDING']},
    transactions: {type: Array, required: true},
})

export interface Seller {
    id: string;
    name: string;
    address: string;
    LGA: string;
    phone: number;
    deal: number;
    status: SellerStatus;
    transactions: [];
}