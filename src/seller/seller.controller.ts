import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddSellerDto } from './dto/AddSeller.dto';
import { Seller } from './Seller.model';
import { SellerService } from './seller.service';
import { GetSellerFilterDto } from './dto/getSellerfilter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/User.model';

@Controller('seller')
@UseGuards(AuthGuard())
export class SellerController {
    constructor(private sellerService: SellerService){}

    @Get()
    @UsePipes(ValidationPipe)
    getAllSelers(
        @Query() getSellerDto: GetSellerFilterDto,
        @GetUser() user: User    
        ):Promise<{total: number, sellers: Seller[]} | Seller[]>{
        return this.sellerService.getAllSellers(getSellerDto, user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createSeller(
        @Body() addSellerDto: AddSellerDto, 
        @GetUser() user: User 
        ): Promise<Seller>{
        return this.sellerService.createSeller(addSellerDto, user);
    }

    @Get('/:phone')
    getSingleSeller(
        @Param('phone') phone: string, 
        @GetUser() user: User
        ): Promise<Seller>{
        return this.sellerService.getSingleSeller(phone, user)
    }
}
