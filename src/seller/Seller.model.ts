import * as mongoose from 'mongoose';
import { SellerStatus } from './dto/getSellerfilter.dto';
 export const SellerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    LGA: {type: String, required: true},
    phone: {type: String, required: true}, 
    deal: {type: Number, required: true},
    status: {type: String, Enum:['COMPLETED' ,'PENDING']},
    dateJoined: {type: String, required: true}
})
SellerSchema.index({name: 'text', LGA: 'text', phone: 'text', })

export interface Seller {
    id: string;
    name: string;
    address: string;
    LGA: string;
    phone: string;
    deal: number;
    status: SellerStatus;
    dateJoined: string;
}
