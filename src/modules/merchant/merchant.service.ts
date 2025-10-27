import { BadRequestException, Injectable } from '@nestjs/common';
import * as merchantInterfaces from './DOTs/merchant.interfaces'
import { UserRepository } from 'src/db-config/repositories/user.repository';
import { MerchantRepository } from 'src/db-config/repositories/merchant.repository';
import { Types } from 'mongoose';

@Injectable()
export class MerchantService {

    constructor(
        private userRepo: UserRepository,
        private merchantRepo: MerchantRepository,
    ) { }


    async createMerchant(merchantData: merchantInterfaces.MerchantCreate) {
        const { name, userId, currency, balance } = merchantData;

        // first make sure that the user is existing
        const user = await this.userRepo.findById(userId);
        if (!user) throw new BadRequestException('Invalid userId, please review.');

        // second make sure that this merchant name is unique
        const oldMerchants = await this.merchantRepo.findByName(name);
        if (oldMerchants) throw new BadRequestException('This merchant already have been created, please review.');

        const newMerchant = await this.merchantRepo.create({
            name,
            userId: new Types.ObjectId(userId),
            currency,
            balance
        })

        return newMerchant;
    }

    async merchantDetails(id: string) {
        const merchant = await this.merchantRepo.findById(id);
        if (!merchant) throw new BadRequestException('Invalid id, please review.');
        return merchant
    }

    async listAllMerchants(options: merchantInterfaces.listAll) {
        const list = await this.merchantRepo.findAll(options)
        return list
    }

    async updateMerchnat(updateObject: merchantInterfaces.updateObject) {
        const { id, name, balance, currency } = updateObject;

        const merchant = await this.merchantRepo.findById(id);
        if (!merchant) throw new BadRequestException('Invalid id, please review.');

        // Build an update object with only changed fields
        const updateData: Partial<typeof merchant> = {};
        if (name && name !== merchant.name) updateData.name = name;
        if (balance !== undefined && balance !== merchant.balance) updateData.balance = balance;
        if (currency && currency !== merchant.currency) updateData.currency = currency;

        if (Object.keys(updateData).length === 0) {
            throw new BadRequestException('No new values to update.');
        }

        const merchantWithSameName = name ? await this.merchantRepo.findByName(name) : null
        if (merchantWithSameName) throw new BadRequestException('There is a merchnat with the same name, please review.');


        const updatedMerchant = await this.merchantRepo.update(id, updateData);
        return updatedMerchant;

    }
}
