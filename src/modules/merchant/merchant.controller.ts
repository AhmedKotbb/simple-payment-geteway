import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiBearerAuth, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/varify-token/varify-token.guard';
import * as merchantInterfaces from './DOTs/merchant.interfaces'
import { MerchantService } from './merchant.service';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { merchantSchemas } from './DOTs/merchant.schemas';

@ApiTags('Merchants')
@ApiSecurity('authorization')
@Controller('merchant')
export class MerchantController {

    constructor( private _service: MerchantService){}

    @UseGuards(JwtGuard, AdminGuard)
    @Post()
    @UsePipes(new JoiValidationPipe(merchantSchemas.createMerchant))
    @ApiOperation({ summary: 'Create merchant', description: 'Create a new merchant (Admin only)' })
    @ApiBody({
        description: 'Merchant creation data',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Acme Corp' },
                email: { type: 'string', format: 'email', example: 'merchant@acme.com' },
                businessType: { type: 'string', example: 'E-commerce' },
                address: { type: 'string', example: '123 Business St, City, Country' },
                phone: { type: 'string', example: '+1234567890' }
            },
            required: ['name', 'email', 'businessType', 'address', 'phone']
        }
    })
    @ApiResponse({ 
        status: 201, 
        description: 'Merchant created successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        name: { type: 'string', example: 'Acme Corp' },
                        email: { type: 'string', example: 'merchant@acme.com' },
                        businessType: { type: 'string', example: 'E-commerce' }
                    }
                },
                message: { type: 'string', example: 'Merchant created successfully!.' }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    async createMerchantHandler(@Body() merchantData: merchantInterfaces.MerchantCreate) {
        const response = await this._service.createMerchant(merchantData)
        return { data: response, message: 'Merchant created successfully!.' };
    }

    @UseGuards(JwtGuard)
    @Get('list')
    @UsePipes(new JoiValidationPipe(merchantSchemas.list))
    @ApiOperation({ summary: 'List merchants', description: 'Get paginated list of all merchants' })
    @ApiQuery({ name: 'page', type: 'number', example: 1, description: 'Page number' })
    @ApiQuery({ name: 'limit', type: 'number', example: 10, description: 'Items per page' })
    @ApiResponse({ 
        status: 200, 
        description: 'Merchants list fetched successfully',
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
                                    name: { type: 'string', example: 'Acme Corp' },
                                    email: { type: 'string', example: 'merchant@acme.com' },
                                    businessType: { type: 'string', example: 'E-commerce' }
                                }
                            }
                        },
                        totalItems: { type: 'number', example: 15 },
                        page: { type: 'number', example: 1 },
                        totalPages: { type: 'number', example: 2 }
                    }
                },
                message: { type: 'string', example: 'Merchants list fetched successfully!.' }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async listMerchantsHandler(@Query() options: merchantInterfaces.listAll){
        const response = await this._service.listAllMerchants(options)
        return { data: response, message: 'Merchants list fetched successfully!.' };
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    @UsePipes(new JoiValidationPipe(merchantSchemas.details))
    @ApiOperation({ summary: 'Get merchant details', description: 'Get detailed information about a specific merchant' })
    @ApiParam({ name: 'id', type: 'string', example: '507f1f77bcf86cd799439011', description: 'Merchant ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Merchant details fetched successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        name: { type: 'string', example: 'Acme Corp' },
                        email: { type: 'string', example: 'merchant@acme.com' },
                        businessType: { type: 'string', example: 'E-commerce' },
                        address: { type: 'string', example: '123 Business St, City, Country' },
                        phone: { type: 'string', example: '+1234567890' },
                        status: { type: 'string', example: 'active' }
                    }
                },
                message: { type: 'string', example: 'Merchant details fetched seccessfully!' }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Merchant not found' })
    async getMerchantDetailsHandler(@Query() data: merchantInterfaces.detalis) {
        const response = await this._service.merchantDetails(data.id)
        return { data: response, message: 'Merchant details fetched seccessfully!'}
    }
    
    @UseGuards(JwtGuard, AdminGuard)
    @Patch(':id')
    @ApiOperation({ summary: 'Update merchant', description: 'Update merchant details (Admin only)' })
    @ApiParam({ name: 'id', type: 'string', example: '507f1f77bcf86cd799439011', description: 'Merchant ID' })
    @ApiBody({
        description: 'Merchant update data',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'Updated Corp Name' },
                businessType: { type: 'string', example: 'Updated Business Type' },
                address: { type: 'string', example: 'Updated Address' },
                phone: { type: 'string', example: '+9876543210' },
                status: { type: 'string', enum: ['active', 'inactive', 'suspended'], example: 'active' }
            }
        }
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Merchant details updated successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        name: { type: 'string', example: 'Updated Corp Name' },
                        email: { type: 'string', example: 'merchant@acme.com' },
                        businessType: { type: 'string', example: 'Updated Business Type' }
                    }
                },
                message: { type: 'string', example: 'Merchant details updated seccessfully!' }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Bad request - validation failed' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
    @ApiResponse({ status: 404, description: 'Merchant not found' })
    async updateMerchantDetalis(
        @Query(new JoiValidationPipe(merchantSchemas.details)) data: merchantInterfaces.detalis,
        @Body(new JoiValidationPipe(merchantSchemas.update)) newMerchantData: merchantInterfaces.updateMerchant
    ) {
        const updateObject = { ...data, ...newMerchantData}
        const response = await this._service.updateMerchnat(updateObject);
        return { data: response, message: 'Merchant details updated seccessfully!'}
    }

}
