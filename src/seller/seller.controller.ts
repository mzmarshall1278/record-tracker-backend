import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddSellerDto } from './dto/AddSeller.dto';
import { Seller } from './Seller.model';
import { SellerService } from './seller.service';
import { GetSellerFilterDto } from './dto/getSellerfilter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('seller')
@UseGuards(AuthGuard())
export class SellerController {
    constructor(private sellerService: SellerService){}

    @Get()
    @UsePipes(ValidationPipe)
    getAllSelers(@Query() getSellerDto: GetSellerFilterDto):Promise<{total: number, sellers: Seller[]} | Seller[]>{
        return this.sellerService.getAllSellers(getSellerDto)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createSeller(@Body() addSellerDto: AddSellerDto): Promise<Seller>{
        return this.sellerService.createSeller(addSellerDto);
    }

    @Get('/:phone')
    getSingleSeller(@Param('phone') phone: string): Promise<Seller>{
        return this.sellerService.getSingleSeller(phone)
    }
}
