import { AddTransactionDto } from './dto/addTransaction.dto';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "./Transaction.model";
import { GetTransactionFilterDto } from './dto/getTransactionFilter.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class TransactionRepository {
    constructor(@InjectModel('Transaction') private readonly Transaction: Model<Transaction>){}

    async getAllTransactions(getTransactionDto: GetTransactionFilterDto):Promise<{transactions:Transaction[], total: number}>{
        const {date, groupBy, sellerId, page } = getTransactionDto;
        const perPage = 10;
        const pipelines = [];
        let total = 0
        if (Object.keys(getTransactionDto).length == 1 && Object.keys(getTransactionDto).includes('page')) {
           total = await this.Transaction.find().count()
            pipelines.push({$group: {
                _id: '$date',
                 totalTransactions: {$sum: 1},
                 totalSale: {$sum: '$price'},
                 totalWeight: {$sum: '$weight'},
                 totalQuantity: {$sum: '$quantity'},
                //   }}
                }}, {$sort: {_id: -1}})
        }

        if(sellerId) {
            total = await this.Transaction.find({seller: new mongoose.Types.ObjectId(sellerId)}).count()
            pipelines.push(
                {$match: {seller: new mongoose.Types.ObjectId(sellerId)}},
                {$sort: {date: -1}}
                )
        }

        if(date){
            total = await this.Transaction.find({date}).count()
            pipelines.push(
                {$match: {date}},
                {$lookup: {from: 'sellers', localField: 'seller', foreignField: '_id', as: 'seller'}},
                {$sort: {date: -1}}
                )
        }

        pipelines.push(
            {$skip: ((+page-1 || 0) * perPage)},
            {$limit: perPage}
        )

        return {transactions: await this.Transaction.aggregate(pipelines), total}
    }

    async addTransaction(addTransactionDto: AddTransactionDto):Promise<Transaction>{
        const {seller, price, weight, date } = addTransactionDto;

        const transaction = await new this.Transaction({
            seller, price, weight, date, completed: false
        }).save()
        return transaction;
    }

    async getSingleTransaction (id: string):Promise<Transaction> {

        return this.Transaction.findById(id);
    }

    async getOngoingTransactions():Promise<Transaction[]> {
        const pipeline = [
            {$match: {completed: false}}
        ];
        return this.Transaction.aggregate(pipeline);
    }
}
