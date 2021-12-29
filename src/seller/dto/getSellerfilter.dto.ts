import { IsEnum, IsString, IsUppercase } from 'class-validator';

export enum SellerStatus {
    completed = 'COMPLETED',
    pending = 'PENDING'
}

export class GetSellerFilterDto {
    @IsString()
    @IsUppercase()
    name: string;

    @IsString()
    @IsUppercase()
    LGA: string;

    @IsString()
    deal: string;

    @IsString()
    @IsEnum(SellerStatus)
    status: SellerStatus;

    @IsString()
    phone: string;
}

