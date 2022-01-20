import { Transaction } from './Transaction.model';
import { AddTransactionDto } from './dto/addTransaction.dto';
import { TransactionRepository } from './Transaction.repository';
import { Injectable } from '@nestjs/common';
import { GetTransactionFilterDto } from './dto/getTransactionFilter.dto';
import { User } from 'src/auth/User.model';

@Injectable()
export class TransactionService {
    constructor(private transactionRepository: TransactionRepository ){}

    async getAllTransactions(getTransactionDto: GetTransactionFilterDto, user: User):Promise<{transactions:Transaction[], total: number}>{
        return this.transactionRepository.getAllTransactions(getTransactionDto, user);
    }

    async addTransaction(addTransactionDto: AddTransactionDto, user: User):Promise<Transaction>{
        return this.transactionRepository.addTransaction(addTransactionDto, user);
    }

    async getSingleTransaction (id: string, user: User):Promise<Transaction> {
        return this.transactionRepository.getSingleTransaction(id, user);
    }

    async getOngoingTransactions ( user: User ):Promise<Transaction[]>{
        return this.transactionRepository.getOngoingTransactions(user)
    }
}
