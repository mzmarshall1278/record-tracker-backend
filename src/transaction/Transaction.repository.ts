import { AddTransactionDto } from './dto/addTransaction.dto';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "./Transaction.model";

@Injectable()
export class TransactionRepository {
    constructor(@InjectModel('Transaction') private readonly Transaction: Model<Transaction>){}

    async getAllTransactions():Promise<Transaction[]>{
        return this.Transaction.find();    
    }

    async addTransaction(addTransactionDto: AddTransactionDto):Promise<Transaction>{
        const {seller, price, weight, date, deal } = addTransactionDto;

        const transaction = await new this.Transaction({
            seller, price, weight, date, deal
        }).save()
        return transaction;
    }

    async getSingleTransaction (id: string):Promise<Transaction> {
        
        return this.Transaction.findById(id);
    }
}