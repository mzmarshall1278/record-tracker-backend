import { User } from 'src/auth/User.model';
import * as mongoose from 'mongoose';
import { Seller } from 'src/seller/Seller.model';

export const TransactionSchema = new mongoose.Schema({
    seller: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Seller'},
    price: {type: Number, required: true},
    weight: {type: Number, required: true},
    date: {type: String, required: true},
    completed: {type: Boolean, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
})

export interface Transaction {
    id: string;
    seller: string | Seller;
    price: number;
    weight: number;
    date: string;
    completed: true;
    userId: string | User
}