import { Controller, Get } from '@nestjs/common';
import { Seller } from './Seller.model';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
    constructor(private sellerService: SellerService){}

    @Get()
    getAllSelers():Promise<Seller[]>{
        return this.sellerService.getAllSellers()
    }
}
