import { Body, Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Get()
    @UsePipes(ValidationPipe)
    login(@Body() loginDto: AuthDto){
        return this.authService.login(loginDto);
    }

}
