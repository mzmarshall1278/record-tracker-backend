import { Injectable } from '@nestjs/common';
import { SellerRepository } from './Seller.repository';
import { Seller } from './Seller.model';
import { AddSellerDto } from './dto/AddSeller.dto';

@Injectable()
export class SellerService {
    constructor(private sellerRepository: SellerRepository){}

    async getAllSellers():Promise<Seller[]>{
        return this.sellerRepository.getAllSellers()
    }

    async createSeller(addSellerDto: AddSellerDto): Promise<Seller>{
        return this.sellerRepository.createSeller(addSellerDto)
    }
}
