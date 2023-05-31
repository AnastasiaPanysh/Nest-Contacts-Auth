import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  pwd: string;
}

export type UserDocument = User & Document;

export const UserModel = SchemaFactory.createForClass(User);
