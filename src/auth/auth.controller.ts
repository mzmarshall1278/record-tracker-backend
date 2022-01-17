import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() loginDto: AuthDto): Promise<{accessToken: string}>{
        return this.authService.login(loginDto);
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signup(@Body() signupDto: AuthDto): Promise<string>{
        return this.authService.signup(signupDto);
    }
}
