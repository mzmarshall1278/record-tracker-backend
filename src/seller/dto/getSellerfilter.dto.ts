import { IsEnum, IsOptional, IsString, IsUppercase, IsNotEmpty } from 'class-validator';

export enum SellerStatus {
    completed = 'COMPLETED',
    pending = 'PENDING'
}

export class GetSellerFilterDto {

    @IsNotEmpty()
    page: string;

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
