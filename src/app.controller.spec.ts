import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './controller/app.controller';
import { UserService } from './service/app.service'

describe('AppController', () => {
  let appController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    appController = app.get<UserController>(UserController);
  });
});
