import { Transaction } from './Transaction.model';
import { AddTransactionDto } from './dto/addTransaction.dto';
import { Body, Controller, Get, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { GetTransactionFilterDto } from './dto/getTransactionFilter.dto';

@Controller('transaction')
export class TransactionController {
    constructor(private transactionService: TransactionService){}

    @Get()
    @UsePipes(ValidationPipe)
    getALLTasks(@Query() getTransactionDto: GetTransactionFilterDto):Promise<{transactions:Transaction[], total: number}>{
        return this.transactionService.getAllTransactions(getTransactionDto)
    }

    @Post()
    @UsePipes(ValidationPipe)
    addTransaction(@Body() addTransactionDto: AddTransactionDto):Promise<Transaction>{
        return this.transactionService.addTransaction(addTransactionDto);
    }

    @Get('/ongoing')
    getOngoingTransactions() {
        return this.transactionService.getOngoingTransactions();
    }

    @Get('/:id')
    getSingleTransaction(@Param('id') id: string): Promise<Transaction> {
        return this.transactionService.getSingleTransaction(id);
    }

}
