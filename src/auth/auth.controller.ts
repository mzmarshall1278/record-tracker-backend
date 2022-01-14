import { Body, Controller, Get } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Get()
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

}
