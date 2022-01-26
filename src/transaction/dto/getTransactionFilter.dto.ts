import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetTransactionFilterDto {
    @IsString()
    @IsOptional()
    date: string;

    @IsOptional()
    sellerId: string

    @IsBoolean()
    @IsOptional()
    completed: Boolean;

    @IsNotEmpty()
    page: string;
}