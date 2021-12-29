import { IsBoolean, IsOptional, IsString } from "class-validator";

export class GetTransactionFilterDto {
    @IsString()
    @IsOptional()
    date: string;

    @IsBoolean()
    @IsOptional()
    groupBy: Boolean;
}