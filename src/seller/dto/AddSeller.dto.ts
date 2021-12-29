import { IsEnum, IsNotEmpty, IsString, IsUppercase } from "class-validator";
import { SellerStatus } from "./getSellerfilter.dto";

export class AddSellerDto {
    @IsString()
    @IsNotEmpty()
    @IsUppercase()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    @IsUppercase()
    LGA: string;

    @IsString()
    @IsNotEmpty()
    phone: number;

    @IsString()
    @IsNotEmpty()
    deal: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(SellerStatus)
    status: SellerStatus;
}