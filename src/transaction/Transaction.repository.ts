import { User } from 'src/auth/User.model';
import { AddTransactionDto } from './dto/addTransaction.dto';
import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction } from "./Transaction.model";
import { GetTransactionFilterDto } from './dto/getTransactionFilter.dto';
import * as mongoose from 'mongoose';
import { SellerService } from '../seller/seller.service';

@Injectable()
export class TransactionRepository {
    constructor(
        @InjectModel('Transaction')
        private readonly Transaction: Model<Transaction>,
        private sellerService: SellerService
    ){}

    async getAllTransactions(getTransactionDto: GetTransactionFilterDto, user: User):Promise<{transactions:Transaction[], total: number}>{
        const {date, completed, sellerId, page } = getTransactionDto;

        const perPage = 10;
        let pipelines: mongoose.PipelineStage[] = [
            {$match: {userId: new mongoose.Types.ObjectId(user.id)}},
        ];
        let total = 0
        if (Object.keys(getTransactionDto).length == 1 && Object.keys(getTransactionDto).includes('page')) {
            total = await this.Transaction.find({userId: user.id}).count();
            pipelines.push({$group: {
                _id: '$date',
                 totalTransactions: {$sum: 1},
                 totalSale: {$sum: '$price'},
                 totalWeight: {$sum: '$weight'},
                 totalQuantity: {$sum: '$quantity'},
                }}, {$sort: {_id: -1}})
            }

        if(completed){
            total = await this.Transaction.find({completed: true, userId: user.id}).count()
            pipelines.push(
                {$match: {seller: new mongoose.Types.ObjectId(sellerId)}},
                {$sort: {date: -1}}
                ) 
        }

        if(sellerId) {
            total = await this.Transaction.find({seller: new mongoose.Types.ObjectId(sellerId), userId: user.id}, {userId: user.id}).count()
            pipelines.push(
                {$match: {seller: new mongoose.Types.ObjectId(sellerId)}},
                {$sort: {date: -1}}
                )
        }

        if(date){
            total = await this.Transaction.find({date, userId: user.id}).count()
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

        return { transactions: await this.Transaction.aggregate(pipelines), total };
    }

    async addTransaction(addTransactionDto: AddTransactionDto , user: User):Promise<Transaction>{
        const {seller, price, weight, date } = addTransactionDto;

        await this.sellerService.updateSellerStatus(seller, user);
        const transaction = await new this.Transaction({
            seller, price, weight, date, completed: false, userId: user.id
        }).save()
        return transaction;
    }

    async getSingleTransaction (id: string, user: User):Promise<Transaction> {

        const transaction = await this.Transaction.findById(id);

        if(transaction.userId !== user.id) throw new UnauthorizedException('You are not authorized to view this transaction')

        return transaction;
    }

    async getOngoingTransactions(user: User):Promise<Transaction[]> {
        const pipeline: mongoose.PipelineStage[] = [
            {$match: {completed: false, userId: new mongoose.Types.ObjectId(user.id)}},
            // {$group: {
            //     _id: {completed: '$completed', userId: new mongoose.Types.ObjectId(user.id)},
            //     totalPrice: {$sum: '$price'},
            //     totalQuantity: {$sum: '$quantity'},
            //     totalWeight: {$sum: '$weight'},
            //     count: { $sum: 1 }
            // }}
        ];
        return this.Transaction.aggregate(pipeline);
    }

}
