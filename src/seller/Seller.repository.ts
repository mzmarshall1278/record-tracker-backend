import { Model } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Seller } from './Seller.model';
import { AddSellerDto } from './dto/AddSeller.dto';

@Injectable()
export class SellerRepository {
    constructor(@InjectModel('Seller') private readonly Seller: Model<Seller> ){}

    async getAllSellers():Promise<Seller[]>{
        return this.Seller.find()
    }

    async createSeller (addSellerDto: AddSellerDto): Promise<Seller>{
        const {name, address, LGA, phone, deal} = addSellerDto;

        const seller = await new this.Seller({
            name, address, LGA, phone, deal
        }).save()
        return seller
    }
}