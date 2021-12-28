export class GetSellerFilterDto {
    name: string;
    lga: string;
    deal: string;
    status: SellerStatus
}

export enum SellerStatus {
    completed = 'Completed',
    pending = 'PENDING'
}