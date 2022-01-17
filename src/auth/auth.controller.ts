import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() loginDto: AuthDto){
        return this.authService.login(loginDto);
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signup(@Body() signupDto: AuthDto){
        return this.authService.signup(signupDto);
    }
}
