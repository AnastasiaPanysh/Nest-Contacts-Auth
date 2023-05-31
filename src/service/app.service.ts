import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/app.repository';
import { bcrypt } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(email: string, pwd: string): Promise<any>{
    const findUser = await this.userRepository.getUserByEmail(email);
    if (findUser) throw new Error('User with such email already exists');
    const hashPwd = await bcrypt.hash(pwd, 10);
    const createdUser = await this.userRepository.createUser(email, hashPwd);
    return createdUser;
  }

  async authorisationUser(email: string, pwd: string): Promise<any>{
    const findUser = await this.userRepository.getUserByEmail(email);
    if (!findUser) throw new Error('User with such email not found');
    const hashedPassword = findUser.pwd;
    if (!(await bcrypt.compare(pwd, hashedPassword))) throw new Error('Incorrect password');
    return findUser;
  }
}
