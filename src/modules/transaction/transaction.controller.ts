import { Body, Controller, Get, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtGuard } from 'src/guards/varify-token/varify-token.guard';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { TransactionSchemas } from './DOTs/transaction.schema';
import * as transactionInterface from './DOTs/transaction.interface';
import { AdminGuard } from 'src/guards/admin/admin.guard';

@Controller('transaction')
export class TransactionController {

    constructor(private _service: TransactionService){}

    @UseGuards(JwtGuard)
    @Post()
    @UsePipes(new JoiValidationPipe(TransactionSchemas.createTransaction))
    async createTransactionHandler(@Body() transactionData: transactionInterface.TransactionData){
        const response = await this._service.createTransaction(transactionData)
        return {data: response, message: "Transaction created successfully!"}
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Post('approve')
    @UsePipes(new JoiValidationPipe(TransactionSchemas.details))
    async approveTransactionHandler(@Body() data: transactionInterface.details){
        const response = await this._service.approveTransaction(data)
        return {data: response, message: "Transaction approved successfully!"}
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Post('decline')
    @UsePipes(new JoiValidationPipe(TransactionSchemas.details))
    async declineTransactionHandler(@Body() data: transactionInterface.details){
        const response = await this._service.declineTransacion(data)
        return {data: response, message: "Transaction declined successfully!"}
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Get()
    @UsePipes(new JoiValidationPipe(TransactionSchemas.list))
    async listTransactionsHandler(@Query() options: transactionInterface.list){
        const response = await this._service.listAllTransactions(options)
        return { data: response, message: 'Transactions list fetched successfully!.' };
    }
}
