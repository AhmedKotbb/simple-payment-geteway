import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { JwtGuard } from 'src/guards/varify-token/varify-token.guard';
import * as merchantInterfaces from './DOTs/merchant.interfaces'
import { MerchantService } from './merchant.service';
import { JoiValidationPipe } from 'src/pipes/joi-validation/joi-validation.pipe';
import { merchantSchemas } from './DOTs/merchant.schemas';

@Controller('merchant')
export class MerchantController {

    constructor( private _service: MerchantService){}

    @UseGuards(JwtGuard, AdminGuard)
    @Post()
    @UsePipes(new JoiValidationPipe(merchantSchemas.createMerchant))
    async createMerchantHandler(@Body() merchantData: merchantInterfaces.MerchantCreate) {
        const response = await this._service.createMerchant(merchantData)
        return { data: response, message: 'Merchant created successfully!.' };
    }

    @UseGuards(JwtGuard)
    @Get('list')
    @UsePipes(new JoiValidationPipe(merchantSchemas.list))
    async listMerchantsHandler(@Query() options: merchantInterfaces.listAll){
        const response = await this._service.listAllMerchants(options)
        return { data: response, message: 'Merchants list fetched successfully!.' };
    }


    @UseGuards(JwtGuard)
    @Get(':id')
    @UsePipes(new JoiValidationPipe(merchantSchemas.details))
    async getMerchantDetailsHandler(@Query() data: merchantInterfaces.detalis) {
        const response = await this._service.merchantDetails(data.id)
        return { data: response, message: 'Merchant details fetched seccessfully!'}
    }
    
    @UseGuards(JwtGuard, AdminGuard)
    @Patch(':id')
    async updateMerchantDetalis(
        @Query(new JoiValidationPipe(merchantSchemas.details)) data: merchantInterfaces.detalis,
        @Body(new JoiValidationPipe(merchantSchemas.update)) newMerchantData: merchantInterfaces.updateMerchant
    ) {
        const updateObject = { ...data, ...newMerchantData}
        const response = await this._service.updateMerchnat(updateObject);
        return { data: response, message: 'Merchant details updated seccessfully!'}
    }

}
