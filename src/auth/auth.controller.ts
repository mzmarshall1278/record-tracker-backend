import { Body, Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Get()
    @UsePipes(ValidationPipe)
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

}
