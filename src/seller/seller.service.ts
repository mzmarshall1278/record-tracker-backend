import { Injectable } from '@nestjs/common';
import { SellerRepository } from './Seller.repository';
import { Seller } from './Seller.model';

@Injectable()
export class SellerService {
    constructor(private sellerRepository: SellerRepository){}

    async getAllSellers():Promise<Seller[]>{
        return this.sellerRepository.getAllSellers()
    }
}
