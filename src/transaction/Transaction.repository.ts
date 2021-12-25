import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "./Transaction.model";

@Injectable()
export class TransactionRepository {
    constructor(@InjectModel('Transaction') private TransactionModel: Model<Transaction>){}

    async getAllTransactions(){
        return this.TransactionModel.find();
    }
}