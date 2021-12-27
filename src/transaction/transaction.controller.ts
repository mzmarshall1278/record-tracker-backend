import { Transaction } from './Transaction.model';
import { AddTransactionDto } from './dto/addTransaction.dto';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { GetTransactionFilterDto } from './dto/getTransactionFilter.dto';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService){}

    @Get()
    getALLTasks(@Query() getTransactionDto: GetTransactionFilterDto):Promise<Transaction[]>{
        return this.transactionService.getAllTransactions(getTransactionDto)
    }

    @Post()
    addTransaction(@Body() addTransactionDto: AddTransactionDto):Promise<Transaction>{
        return this.transactionService.addTransaction(addTransactionDto);
    }

    @Get('/:id')
    getSingleTransaction(@Param('id') id: string): Promise<Transaction> {
        return this.transactionService.getSingleTransaction(id);
    }
}
