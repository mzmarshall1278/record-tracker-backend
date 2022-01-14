import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { UserSchema } from './User.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository]
})
export class AuthModule {}
