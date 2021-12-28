import { SellerStatus } from "./getSellerfilter.dto";

export class AddSellerDto {
    name: string;
    address: string;
    LGA: string;
    phone: number;
    deal: number;
    status: SellerStatus;
}