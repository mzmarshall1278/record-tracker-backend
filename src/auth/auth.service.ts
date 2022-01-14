import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
    constructor(private authRepository: AuthRepository){}

    async login(loginDto: LoginDto){
        return this.authRepository.login(loginDto);
    }
}
