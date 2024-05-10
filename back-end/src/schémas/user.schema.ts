import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum Role {
    ADMIN = "ADMIN",
    INTERN = "INTERN",
    ENGINEER = "ENGINEER"
}

export interface User{
  _id: string; 
  name: string;
  email: string;
  role: Role; 
  password: string;
}


export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    role: Role; 
    
    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
