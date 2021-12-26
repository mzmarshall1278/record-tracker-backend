import { Model } from 'mongoose';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Seller } from './Seller.model';

@Injectable()
export class SellerRepository {
    constructor(@InjectModel('Seller') private readonly Seller: Model<Seller> ){}

    async getAllSellers():Promise<Seller[]>{
        return this.Seller.find()
    }
}