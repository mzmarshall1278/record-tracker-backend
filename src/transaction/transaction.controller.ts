import { Transaction } from './Transaction.model';
import { AddTransactionDto } from './dto/addTransaction.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService){}

    @Get()
    getALLTasks():Promise<Transaction[]>{
        return this.transactionService.getAllTransactions()
    }

    @Post()
    addTransaction(@Body() addTransactionDto: AddTransactionDto):Promise<Transaction>{
        return this.transactionService.addTransaction(addTransactionDto);
    }
}
