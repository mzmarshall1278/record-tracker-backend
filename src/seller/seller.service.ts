import { Injectable } from '@nestjs/common';
import { SellerRepository } from './Seller.repository';
import { Seller } from './Seller.model';
import { AddSellerDto } from './dto/AddSeller.dto';
import { GetSellerFilterDto } from './dto/getSellerfilter.dto';

@Injectable()
export class SellerService {
    constructor(private sellerRepository: SellerRepository){}

    async getAllSellers(getSellerDto: GetSellerFilterDto):Promise<{total: number, sellers: Seller[]} | Seller[]>{
        return this.sellerRepository.getAllSellers(getSellerDto)
    }

    async createSeller(addSellerDto: AddSellerDto): Promise<Seller>{
        return this.sellerRepository.createSeller(addSellerDto)
    }

    async getSingleSeller (phone: string): Promise<Seller>{
        return this.sellerRepository.getSingleSeller(phone)
    }
}
