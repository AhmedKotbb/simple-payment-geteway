export interface MerchantCreate {
    userId: string,
    name: string,
    currency: string,
    balance: number
}

export interface detalis {
    id: string
}

export interface listAll {
    page: number;
    limit: number
}

export interface updateMerchant {
    name?: string,
    currency?: string,
    balance?: number
}

export interface updateObject {
    id: string,
    name?: string,
    currency?: string,
    balance?: number
}