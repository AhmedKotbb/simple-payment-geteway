import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as transactionInterface from './DOTs/transaction.interface';
import { MerchantRepository } from 'src/db-config/repositories/merchant.repository';
import { TransactionRepository } from 'src/db-config/repositories/transaction.repository';
import { Types } from 'mongoose';


export enum TransactionStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
}

@Injectable()
export class TransactionService {

    constructor(
        private tnxRepo: TransactionRepository,
        private merchantRepo: MerchantRepository,
    ) { }

    async createTransaction(transactionData: transactionInterface.TransactionData) {
        const { amount, currency, merchantId, acountHolderName, accountHolderNumber, expireDate, csv } = transactionData;
        // moock the varifying account proccess
        const varifyUserCard = this.varifyBankAcount({ accountHolderNumber, acountHolderName, expireDate, csv });

        if(varifyUserCard.isExpired) throw new BadRequestException('This card is expired, please contact your bank!');

        const merchant = await this.merchantRepo.findById(merchantId);
        if(!merchant) throw new BadRequestException('Invalid merchant id, please review.');

        const transaction = await this.tnxRepo.create({
            merchantId: new Types.ObjectId(merchantId),
            amount,
            currency,
            cardLast4: varifyUserCard.cardLast4,
            status: TransactionStatus.PENDING
        })

        return transaction
    }

    async approveTransaction(data: transactionInterface.details) {
        const { id } = data
        const transaction = await this.tnxRepo.findById(id)
        if(!transaction) throw new NotFoundException(`Transaction id is not valid, please review.`);

        if (transaction.status !== TransactionStatus.PENDING) throw new BadRequestException(`Transaction is already ${transaction.status}. Only PENDING transactions can be approved.`);

        const { merchantId, amount } = transaction;
        // Extract the actual ObjectId from the populated merchant object
        const merchantObjectId = merchantId._id || merchantId;
        const merchant = await this.merchantRepo.findById(merchantObjectId.toString());
        if(!merchant)throw new BadRequestException('Invalid id, please review.');
        const newBalance = merchant.balance + amount

        await this.merchantRepo.update(merchantObjectId.toString(), { balance: newBalance});
        const updatedTnx = await this.tnxRepo.updateStatus(id, TransactionStatus.APPROVED);

        return updatedTnx
    }

    async declineTransacion(data: transactionInterface.details){
        const { id } = data
        const transaction = await this.tnxRepo.findById(id)
        if(!transaction) throw new NotFoundException(`Transaction id is not valid, please review.`);

        if (transaction.status !== TransactionStatus.PENDING) throw new BadRequestException(`Transaction is already ${transaction.status}. Only PENDING transactions can be declined.`);
        const updatedTnx = await this.tnxRepo.updateStatus(id, TransactionStatus.DECLINED);
        return updatedTnx;
    }


    async listAllTransactions(options: transactionInterface.list) {
        const list = await this.tnxRepo.findAll()
        return list
    }


    private varifyBankAcount(cardData: any) {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);
        const currentMonth = `${month}/${year}`;
        // Parse expireDate
        const [expMonth, expYear] = cardData.expireDate.split('/').map(Number);
        const [currMonth, currYear] = currentMonth.split('/').map(Number);
        // Compare: expired if year < currentYear or same year but month < currentMonth
        const isExpired = expYear < currYear || (expYear === currYear && expMonth < currMonth);
        return {
            cardLast4: cardData.accountHolderNumber.toString().slice(-4),
            balance: 10000,
            isExpired
        }
    }

}
