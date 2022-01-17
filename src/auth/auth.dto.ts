import { IsNotEmpty, MinLength } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}