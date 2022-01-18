import { TransactionRepository } from './Transaction.repository';
import { TransactionSchema } from './Transaction.model';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerModule } from 'src/seller/seller.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Transaction', schema: TransactionSchema}]),
     SellerModule,
    AuthModule],
  controllers: [TransactionController],
  providers: [TransactionRepository, TransactionService]
})
export class TransactionModule {}
