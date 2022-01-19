import { Transaction } from './Transaction.model';
import { AddTransactionDto } from './dto/addTransaction.dto';
import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { GetTransactionFilterDto } from './dto/getTransactionFilter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/User.model';

@Controller('transaction')
@UseGuards(AuthGuard())
export class TransactionController {
    constructor(private transactionService: TransactionService){}

    @Get()
    @UsePipes(ValidationPipe)
    getALLTasks(@Query() getTransactionDto: GetTransactionFilterDto, @GetUser() user: User):Promise<{transactions:Transaction[], total: number}>{
        return this.transactionService.getAllTransactions(getTransactionDto, user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    addTransaction(@Body() addTransactionDto: AddTransactionDto, @GetUser() user: User):Promise<Transaction>{
        return this.transactionService.addTransaction(addTransactionDto, user);
    }

    @Get('/ongoing')
    getOngoingTransactions(@GetUser() user: User) {
        return this.transactionService.getOngoingTransactions(user);
    }

    @Get('/:id')
    getSingleTransaction(@Param('id') id: string): Promise<Transaction> {
        return this.transactionService.getSingleTransaction(id);
    }

}
