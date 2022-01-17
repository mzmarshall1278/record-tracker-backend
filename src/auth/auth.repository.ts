import { ConflictException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "./User.model"
import { AuthDto } from './auth.dto';

export class AuthRepository {
    constructor(@InjectModel ('User') private readonly User: Model<User>){}

    async login(loginDto: AuthDto){
        const {username, password} = loginDto;
        return 'login'
    }

    async signup(signupDto: AuthDto){
        const {username, password} = signupDto;

        try {
           const found = await this.User.findOne({ username });
           if(found) {
            throw new ConflictException('Username already taken');
           }
            await new this.User({username, password, role: 'ADMIN'}).save()
            return 'success'
        } catch (error) {
            return error
        }
    }
}