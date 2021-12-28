import { IsNotEmpty, IsString } from "class-validator";
import { SellerStatus } from "./getSellerfilter.dto";

export class AddSellerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    LGA: string;

    @IsString()
    @IsNotEmpty()
    phone: number;

    @IsString()
    @IsNotEmpty()
    deal: number;

    @IsString()
    @IsNotEmpty()
    status: SellerStatus;
}