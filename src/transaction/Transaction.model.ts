import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    seller: {type: String, required: true},
    price: {type: Number, required: true},
    weight: {type: Number, required: true},
    date: {type: String, required: true}
})

export interface Transaction {
    id: string;
    seller: string;
    price: number;
    weight: number;
    date: string;
}