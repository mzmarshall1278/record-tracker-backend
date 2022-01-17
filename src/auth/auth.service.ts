import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private authRepository: AuthRepository){}

    async login(loginDto: AuthDto){
        return this.authRepository.login(loginDto);
    }
}
