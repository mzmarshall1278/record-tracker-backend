import { ConflictException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "./User.model"
import { AuthDto } from './auth.dto';
import * as bcrypt from 'bcrypt'

export class AuthRepository {
    constructor(@InjectModel ('User') private readonly User: Model<User>){}

    async login(loginDto: AuthDto){
        const {username, password} = loginDto;
        return 'login'
    }

    async signup(signupDto: AuthDto){
        const {username, password} = signupDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await this.hashPassword(password ,salt);

        try {
           const found = await this.User.findOne({ username });
           if(found) {
            throw new ConflictException('Username already taken');
           }
            await new this.User({username, password: hashedPassword, role: 'ADMIN', salt}).save()
            return 'Account Created sucessfully'
        } catch (error) {
            return error
        }
    }

    private async hashPassword (password: string, salt: string):Promise<string> {
        return bcrypt.hash(password, salt);
    }

}