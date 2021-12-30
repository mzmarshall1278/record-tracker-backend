import { IsNotEmpty } from "class-validator";

export class AddTransactionDto {
    @IsNotEmpty()
    seller: string;

    @IsNotEmpty()
    weight: number;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    quantity: number;
}