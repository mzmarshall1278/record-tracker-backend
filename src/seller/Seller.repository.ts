import { Model } from 'mongoose';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Seller } from './Seller.model';
import { AddSellerDto } from './dto/AddSeller.dto';
import { GetSellerFilterDto } from './dto/getSellerfilter.dto';

@Injectable()
export class SellerRepository {
    constructor(@InjectModel('Seller') private readonly Seller: Model<Seller> ){}

    async getAllSellers(getSellerDto:GetSellerFilterDto):Promise<Seller[]>{
        const {name, LGA, phone, status, deal} = getSellerDto;

        if (!(name || LGA || phone || status || deal)) {
            return this.Seller.find();
        }

        const pipeline = [];

        if(name) pipeline.push({$match: { $text: { $search: name } } });

        if(phone) pipeline.push({$match: {phone}});

        if(LGA) pipeline.push({$match: {LGA}});

        if(deal) pipeline.push({$match: {deal: +deal}});

        pipeline.push({$sort: {_id: -1}})

        return this.Seller.aggregate(pipeline)
    }

    async createSeller (addSellerDto: AddSellerDto): Promise<Seller>{
        const {name, address, LGA, phone, deal, status} = addSellerDto;

        const seller = await new this.Seller({
            name, address, LGA, phone, deal, status, dateJoined: new Date().toISOString()
        }).save()
        return seller
    }

    async getSingleSeller (phone: string): Promise<Seller> {
        const seller = await this.Seller.findOne({phone});

        if(!seller){
            throw new NotFoundException('The seller does not exist or has not been added!')
        }
        return seller;
    }
}