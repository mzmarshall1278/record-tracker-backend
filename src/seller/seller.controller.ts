import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddSellerDto } from './dto/AddSeller.dto';
import { Seller } from './Seller.model';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {
    constructor(private sellerService: SellerService){}

    @Get()
    getAllSelers():Promise<Seller[]>{
        return this.sellerService.getAllSellers()
    }

    @Post()
    createSeller(@Body() addSellerDto: AddSellerDto): Promise<Seller>{
        return this.sellerService.createSeller(addSellerDto);
    }
}
