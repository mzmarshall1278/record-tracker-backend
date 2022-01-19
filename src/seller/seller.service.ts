import { Injectable } from '@nestjs/common';
import { SellerRepository } from './Seller.repository';
import { Seller } from './Seller.model';
import { AddSellerDto } from './dto/AddSeller.dto';
import { GetSellerFilterDto } from './dto/getSellerfilter.dto';
import { User } from '../auth/User.model';

@Injectable()
export class SellerService {
    constructor(private sellerRepository: SellerRepository){}

    async getAllSellers(getSellerDto: GetSellerFilterDto, user: User):Promise<{total: number, sellers: Seller[]} | Seller[]>{
        return this.sellerRepository.getAllSellers(getSellerDto, user)
    }

    async createSeller(addSellerDto: AddSellerDto, user: User): Promise<Seller>{
        return this.sellerRepository.createSeller(addSellerDto, user)
    }

    async getSingleSeller (phone: string, user: User): Promise<Seller>{
        return this.sellerRepository.getSingleSeller(phone, user)
    }

    async updateSellerStatus(id :string, user): Promise<Seller> {
        return this.sellerRepository.updateSellerStatus(id, user);
    }
}
