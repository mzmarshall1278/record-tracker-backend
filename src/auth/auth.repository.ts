import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "./User.model"
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';

export class AuthRepository {
    constructor(
        @InjectModel ('User') 
        private readonly User: Model<User>,
        private jwtService: JwtService
        ){}

    async login(loginDto: AuthDto): Promise<{accessToken: string}>{
        const {username, password} = loginDto;
        const user = await this.User.findOne({username});
        if(!user) throw new UnauthorizedException('Invalid credentials');

        const userIsVerified = await this.validatePassword(password, user.password, user.salt);
        if(!userIsVerified) throw new UnauthorizedException('Invalid credentials');

        const payload: jwtPayload = {username: user.username}
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken };

    }

    async signup(signupDto: AuthDto): Promise<string>{
        const {username, password} = signupDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await this.hashPassword(password ,salt);

        try {
           const found = await this.User.findOne({ username });
           if(found) {
            throw new ConflictException('Username already taken');
           }
            await new this.User({username, password: hashedPassword, role: 'ADMIN', salt}).save()
            return 'Account Created successfully'
        } catch (error) {
            return error
        }
    }

    async getloggedInUser(user: User): Promise<{username: string, role: string}>{
      if (!user) {
        throw new UnauthorizedException('Authorization error');
      }

        const foundUser = await this.User.findOne({user: user.username});

        return {username: foundUser.username, role: foundUser.role}
    }

    private async validatePassword(password, dbpassword, salt): Promise<boolean> {
        const hash = await bcrypt.hash(password, salt);
        return hash === dbpassword;
    }

    private async hashPassword (password: string, salt: string):Promise<string> {
        return bcrypt.hash(password, salt);
    }

}
