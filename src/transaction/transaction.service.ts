import { Transaction } from './Transaction.model';
import { AddTransactionDto } from './dto/addTransaction.dto';
import { TransactionRepository } from './Transaction.repository';
import { Injectable } from '@nestjs/common';
import { GetTransactionFilterDto } from './dto/getTransactionFilter.dto';

@Injectable()
export class TransactionService {
    constructor(private transactionRepository: TransactionRepository ){}

    async getAllTransactions(getTransactionDto: GetTransactionFilterDto):Promise<{transactions:Transaction[], total: number}>{
        return this.transactionRepository.getAllTransactions(getTransactionDto);
    }

    async addTransaction(addTransactionDto: AddTransactionDto):Promise<Transaction>{
        return this.transactionRepository.addTransaction(addTransactionDto);
    }

    async getSingleTransaction (id: string):Promise<Transaction> {
        return this.transactionRepository.getSingleTransaction(id);
    }
    
    async getOngoingTransactions ():Promise<Transaction[]>{
        return this.transactionRepository.getOngoingTransactions()
    }
}
