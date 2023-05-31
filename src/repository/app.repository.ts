import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../db/user.model';


@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getUserByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async createUser(email: string, hashPwd: string): Promise<UserDocument> {
    const createdUser = new this.userModel({ email, pwd: hashPwd });
    return await createdUser.save();
  }
}
