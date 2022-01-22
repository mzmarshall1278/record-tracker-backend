import { User } from './User.model';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private authRepository: AuthRepository){}

    async login(loginDto: AuthDto): Promise<{accessToken: string}>{
        return this.authRepository.login(loginDto);
    }

    async signup(signupDto: AuthDto): Promise<string>{
        return this.authRepository.signup(signupDto);
    }

    async getloggedInUser(user: User): Promise<{username: string, role: string}>{
        return this.authRepository.getloggedInUser(user)
    }
}
