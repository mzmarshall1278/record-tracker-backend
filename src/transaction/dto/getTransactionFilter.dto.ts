import { IsString } from "class-validator";

export class GetTransactionFilterDto {
    date: string;

    @IsString()
    groupBy: Boolean;
}