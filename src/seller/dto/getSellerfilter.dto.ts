import { IsString } from "class-validator";

export class GetSellerFilterDto {
    @IsString()
    name: string;

    @IsString()
    LGA: string;

    @IsString()
    deal: string;

    @IsString()
    status: SellerStatus;

    @IsString()
    phone: string;
}

export enum SellerStatus {
    completed = 'COMPLETED',
    pending = 'PENDING'
}