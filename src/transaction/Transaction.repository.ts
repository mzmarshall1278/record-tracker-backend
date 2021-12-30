import { AddTransactionDto } from './dto/addTransaction.dto';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "./Transaction.model";
import { GetTransactionFilterDto } from './dto/getTransactionFilter.dto';

@Injectable()
export class TransactionRepository {
    constructor(@InjectModel('Transaction') private readonly Transaction: Model<Transaction>){}

    async getAllTransactions(getTransactionDto: GetTransactionFilterDto):Promise<Transaction[]>{
        const {date, groupBy, } = getTransactionDto;

        const pipelines = [];

        if (!Object.keys(getTransactionDto).length) {
            pipelines.push({$group: {
                _id: '$date',
                 totalTransactions: {$sum: 1},
                 totalSale: {$sum: '$price'},
                 totalWeight: {$sum: '$weight'},
                 totalQuantity: {$sum: '$quantity'},
                //   details: {'$push':{
                //       weight: '$weight',
                //       quantity: '$quantity',
                //       _id: '$_id',
                //       price: '$price',
                //       seller: '$seller'
                //   }}
                }})
        }

        if(date){
            pipelines.push({$match: {date}}, {$lookup: {from: 'sellers', localField: 'seller', foreignField: '_id', as: 'seller'}})
        }

        pipelines.push({$sort: {_id: -1}})
        return this.Transaction.aggregate(pipelines);    
    }

    async addTransaction(addTransactionDto: AddTransactionDto):Promise<Transaction>{
        const {seller, price, weight, date, quantity } = addTransactionDto;

        const transaction = await new this.Transaction({
            seller, price, weight, date, quantity
        }).save()
        return transaction;
    }

    async getSingleTransaction (id: string):Promise<Transaction> {
        
        return this.Transaction.findById(id);
    }
}