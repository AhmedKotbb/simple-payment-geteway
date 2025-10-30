import { Body, Controller, Get, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { JwtGuard } from 'src/guards/varify-token/varify-token.guard';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { TransactionSchemas } from './DOTs/transaction.schema';
import * as transactionInterface from './DOTs/transaction.interface';
import { AdminGuard } from 'src/guards/admin/admin.guard';

@ApiTags('Transactions')
@ApiSecurity('authorization')
@Controller('transaction')
export class TransactionController {

    constructor(private _service: TransactionService){}

    @UseGuards(JwtGuard)
    @Post()
    @UsePipes(new JoiValidationPipe(TransactionSchemas.createTransaction))
    @ApiOperation({ summary: 'Create transaction', description: 'Create a new payment transaction' })
    @ApiBody({
        description: 'Transaction data',
        schema: {
            type: 'object',
            properties: {
                merchantId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                amount: { type: 'number', example: 100.50, description: 'Transaction amount' },
                currency: { type: 'string', example: 'USD', description: 'Currency code' },
                description: { type: 'string', example: 'Payment for services' },
                customerEmail: { type: 'string', format: 'email', example: 'customer@example.com' },
                paymentMethod: { type: 'string', example: 'credit_card' }
            },
            required: ['merchantId', 'amount', 'currency', 'description', 'customerEmail']
        }
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Transaction created successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        transactionId: { type: 'string', example: 'TXN-123456789' },
                        status: { type: 'string', example: 'pending' },
                        amount: { type: 'number', example: 100.50 },
                        currency: { type: 'string', example: 'USD' }
                    }
                },
                message: { type: 'string', example: 'Transaction created successfully!' }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async createTransactionHandler(@Body() transactionData: transactionInterface.TransactionData){
        const response = await this._service.createTransaction(transactionData)
        return {data: response, message: "Transaction created successfully!"}
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Post('approve')
    @UsePipes(new JoiValidationPipe(TransactionSchemas.details))
    @ApiOperation({ summary: 'Approve transaction', description: 'Approve a pending transaction (Admin only)' })
    @ApiBody({
        description: 'Transaction approval data',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: '507f1f77bcf86cd799439011', description: 'Transaction ID' }
            },
            required: ['id']
        }
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Transaction approved successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        status: { type: 'string', example: 'approved' },
                        approvedAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00Z' }
                    }
                },
                message: { type: 'string', example: 'Transaction approved successfully!' }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @ApiResponse({ status: 404, description: 'Transaction not found' })
    async approveTransactionHandler(@Body() data: transactionInterface.details){
        const response = await this._service.approveTransaction(data)
        return {data: response, message: "Transaction approved successfully!"}
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Post('decline')
    @UsePipes(new JoiValidationPipe(TransactionSchemas.details))
    @ApiOperation({ summary: 'Decline transaction', description: 'Decline a pending transaction (Admin only)' })
    @ApiBody({
        description: 'Transaction decline data',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', example: '507f1f77bcf86cd799439011', description: 'Transaction ID' }
            },
            required: ['id']
        }
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Transaction declined successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        status: { type: 'string', example: 'declined' },
                        declinedAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00Z' }
                    }
                },
                message: { type: 'string', example: 'Transaction declined successfully!' }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @ApiResponse({ status: 404, description: 'Transaction not found' })
    async declineTransactionHandler(@Body() data: transactionInterface.details){
        const response = await this._service.declineTransacion(data)
        return {data: response, message: "Transaction declined successfully!"}
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Get()
    @UsePipes(new JoiValidationPipe(TransactionSchemas.list))
    @ApiOperation({ summary: 'List transactions', description: 'Get paginated list of all transactions (Admin only)' })
    @ApiQuery({ name: 'page', type: 'number', example: 1, description: 'Page number' })
    @ApiQuery({ name: 'limit', type: 'number', example: 10, description: 'Items per page' })
    @ApiQuery({ name: 'status', type: 'string', example: 'pending', description: 'Filter by transaction status', required: false })
    @ApiQuery({ name: 'merchantId', type: 'string', example: '507f1f77bcf86cd799439011', description: 'Filter by merchant ID', required: false })
    @ApiResponse({ 
        status: 200, 
        description: 'Transactions list fetched successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        documents: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                                    transactionId: { type: 'string', example: 'TXN-123456789' },
                                    status: { type: 'string', example: 'pending' },
                                    amount: { type: 'number', example: 100.50 },
                                    currency: { type: 'string', example: 'USD' },
                                    merchantId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                                    createdAt: { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00Z' }
                                }
                            }
                        },
                        totalItems: { type: 'number', example: 50 },
                        page: { type: 'number', example: 1 },
                        totalPages: { type: 'number', example: 5 }
                    }
                },
                message: { type: 'string', example: 'Transactions list fetched successfully!.' }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    async listTransactionsHandler(@Query() options: transactionInterface.list){
        const response = await this._service.listAllTransactions(options)
        return { data: response, message: 'Transactions list fetched successfully!.' };
    }
}
