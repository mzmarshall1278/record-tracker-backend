import { Transaction } from './Transaction.model';
import { AddTransactionDto } from './dto/addTransaction.dto';
import { TransactionRepository } from './Transaction.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
    constructor(private transactionRepository: TransactionRepository ){}

    async getAllTransactions():Promise<Transaction[]>{
        return this.transactionRepository.getAllTransactions()
    }

    async addTransaction(addTransactionDto: AddTransactionDto):Promise<Transaction>{
        return this.transactionRepository.addTransaction(addTransactionDto);
    }
}
