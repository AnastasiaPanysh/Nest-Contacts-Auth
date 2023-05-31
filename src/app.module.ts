import { Module } from '@nestjs/common';
import { UserController } from './controller/app.controller';
import { UserService } from './service/app.service';
import { UserRepository } from './repository/app.repository';
import { UserModel } from './db/user.model';
import { getModelToken } from '@nestjs/mongoose';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    { provide: getModelToken('User'), useValue: UserModel },
  ],
})
export class AppModule {}



