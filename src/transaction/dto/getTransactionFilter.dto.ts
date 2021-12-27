import { IsString } from "class-validator";

export class getTransactionFilterDto {
    date: string;
    
    @IsString()
    seller: string;

    @IsString()
    groupBy: groupingType;
}

export enum groupingType {
    day = 'DAY',
    week = 'WEEK',
    month = 'MONTH',
}