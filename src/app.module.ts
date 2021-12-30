import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { TransactionModule } from './transaction/transaction.module';
import { SellerModule } from './seller/seller.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/erp'),
    TransactionModule,
    SellerModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
