import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/erp'),
    TransactionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
