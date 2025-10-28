export interface TransactionData {
    amount: number,
    currency: string,
    merchantId: string;
    acountHolderName: string,
    accountHolderNumber: number,
    expireDate: Date,
    csv: number
}

export interface details {
    id: string
}

export interface list {
    page: number;
    limit: number
}