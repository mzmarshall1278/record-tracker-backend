import * as mongoose from 'mongoose';
 export const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['SUPER_ADMIN', 'ADMIN'], required: true}
})

export interface User {
    name: string;
    password: string;
    role: UserRole;
}

export enum UserRole {
    superAdmin = 'SUPER_ADMIN',
    admin = 'ADMIN'
}
