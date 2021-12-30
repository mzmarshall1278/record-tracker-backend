import { IsBoolean, IsOptional, IsString } from "class-validator";

export class GetTransactionFilterDto {
    @IsString()
    @IsOptional()
    date: string;

    @IsOptional()
    sellerId: string

    @IsBoolean()
    @IsOptional()
    groupBy: Boolean;
}