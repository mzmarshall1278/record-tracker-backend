import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "./User.model"
import { AuthDto } from './auth.dto';

export class AuthRepository {
    constructor(@InjectModel ('User') private readonly User: Model<User>){}

    async login(loginDto: AuthDto){
        const {name, password} = loginDto;
        return 'login'
    }
}