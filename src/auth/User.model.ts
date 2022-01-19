import * as mongoose from 'mongoose';
 export const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['SUPER_ADMIN', 'ADMIN'], required: true},
    salt: {type: String, required: true}
})

export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
    salt: string
}

export enum UserRole {
    superAdmin = 'SUPER_ADMIN',
    admin = 'ADMIN'
}
