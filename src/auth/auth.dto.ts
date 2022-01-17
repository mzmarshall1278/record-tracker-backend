import { IsLowercase, IsNotEmpty, Matches, MinLength } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @MinLength(4)
    @IsLowercase()
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/   )
    password: string;
}