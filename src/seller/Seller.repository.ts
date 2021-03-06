import { Model, Mongoose } from 'mongoose';
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Seller } from './Seller.model';
import { AddSellerDto } from './dto/AddSeller.dto';
import { GetSellerFilterDto } from './dto/getSellerfilter.dto';
import { User } from '../auth/User.model';
import * as mongoose from 'mongoose';

@Injectable()
export class SellerRepository {
    constructor(@InjectModel('Seller') private readonly Seller: Model<Seller> ){}

    async getAllSellers(getSellerDto:GetSellerFilterDto, user: User):Promise<{total: number, sellers: Seller[]} | Seller[]>{
        const {name, LGA, phone, status, deal, page} = getSellerDto;
        const perPage: number = 10;


        if (!(name || LGA || phone || status || deal)) {
            const total = await this.Seller.find({userId: new mongoose.Types.ObjectId(user.id)}).count();
            const sellers = await this.Seller.find({userId: new mongoose.Types.ObjectId(user.id)}).sort({name: 1}).skip((+page-1) * perPage).limit(perPage);
            return {total, sellers}
        }

        const pipeline: mongoose.PipelineStage[] = [];

        if(name) pipeline.push({$match: { $text: { $search: name }, userId: new mongoose.Types.ObjectId(user.id) }});

        if(phone) pipeline.push({$match: {phone, userId: new mongoose.Types.ObjectId(user.id)}});

        if(LGA) pipeline.push({$match: {LGA, userId: new mongoose.Types.ObjectId(user.id)}});

        if(deal) pipeline.push({$match: {deal: +deal, userId: new mongoose.Types.ObjectId(user.id)}});
        pipeline.push(
            {$sort: {dateJoined: -1}},
            {$skip: ((+page-1 || 0) * perPage)},
            {$limit: perPage}
            )

        return this.Seller.aggregate(pipeline)
    }

    async createSeller (addSellerDto: AddSellerDto, user: User): Promise<Seller>{
        const {name, address, LGA, phone, deal, status} = addSellerDto;

        const foundSeller = await this.Seller.findOne({phone});

        if(foundSeller) throw new ConflictException('This Number Has been used by another seller.')

        const seller = await new this.Seller({
            name, address, LGA, phone, deal, status, dateJoined: new Date().toLocaleDateString(), userId: new mongoose.Types.ObjectId(user.id)
        }).save()
        return seller
    }

    async getSingleSeller (phone: string, user: User): Promise<Seller> {
        const seller = await this.Seller.findOne({phone, userId: new mongoose.Types.ObjectId(user.id)});

        if(!seller){
            throw new NotFoundException('The seller does not exist or has not been added!')
        }
        return seller;
    }

    async updateSellerStatus (id: string, user: User): Promise<Seller>{
        return this.Seller.findOneAndUpdate({id, userId: new mongoose.Types.ObjectId(user.id)}, {$set: {status: 'COMPLETED'}})
    }
}
