import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetTransactionFilterDto {
    @IsString()
    @IsOptional()
    date: string;

    @IsOptional()
    sellerId: string

    @IsString()
    @IsOptional()
    completed: string;

    @IsNotEmpty()
    page: string;
}