import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtPayload } from './jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from "./User.model";

    @Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy){
        constructor(
            @InjectModel ('User') 
            private readonly User: Model<User>,
        ){
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'N07h1ng_r3ally_5pec1aL',
            });
        }

        async validate(payload: jwtPayload): Promise<User>{
            const {username} = payload;

            const user = await this.User.findOne({username});

            if(!user) throw new UnauthorizedException('User not authorized'); 

            return user;
        }
    }