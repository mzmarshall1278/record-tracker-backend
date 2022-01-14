import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { User } from "./User.model"
import { LoginDto } from './login.dto';

export class AuthRepository {
    constructor(@InjectModel ('User') private readonly User: Model<User>){}

    async login(loginDto: LoginDto){
        const {name, password} = loginDto;
        return 'login'
    }
}