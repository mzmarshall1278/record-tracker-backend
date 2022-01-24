import { Body, Controller, Get, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { User } from './User.model';

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

    @Get('/user')
    @UseGuards(AuthGuard())
    getLoggedInUser(@GetUser() user: User): Promise<{username: string, role: string}>{
        return this.authService.getloggedInUser(user);
    }
}
