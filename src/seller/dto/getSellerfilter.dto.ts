import { IsEnum, IsOptional, IsString, IsUppercase } from 'class-validator';

export enum SellerStatus {
    completed = 'COMPLETED',
    pending = 'PENDING'
}

export class GetSellerFilterDto {
    @IsString()
    @IsUppercase()
    @IsOptional()
    name: string;

    @IsString()
    @IsUppercase()
    @IsOptional()
    LGA: string;

    @IsString()
    @IsOptional()
    deal: string;

    @IsString()
    @IsOptional()
    @IsEnum(SellerStatus)
    status: SellerStatus;

    @IsString()
    @IsOptional()
    phone: string;
}

