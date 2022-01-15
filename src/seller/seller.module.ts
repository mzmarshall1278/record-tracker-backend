import { SellerRepository } from './Seller.repository';
import { Module } from '@nestjs/common';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerSchema } from './Seller.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Seller', schema: SellerSchema}])],
  controllers: [SellerController],
  providers: [SellerService, SellerRepository],
  exports: [SellerService]
})
export class SellerModule {}
