import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schémas/user.schema';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { ObjectId } from 'mongoose';
import { hash } from 'bcrypt';
import { RegisterDto } from 'src/dto/register-user.dto';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

    async findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINNER'): Promise<User[]> {
        if (role) {
            return this.UserModel.find({ role }).exec();
        }
        return this.UserModel.find().exec();
    }
    async findOneByEmail(email: string){
        return this.UserModel.findOne({email}).exec();
    }

    async findOne(email: string) {
        const user = await this.UserModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
    
    // async findOne(id: string): Promise<User> {
    //     try {
            
    //     } catch (error) {
            
    //     } const user = await this.UserModel.findById(id).exec();
    //     if (!user) throw new NotFoundException('User Not Found');
    //     return user;
    // }

    async createUser(createUserDto: RegisterDto): Promise<User> {
        try {
            // Hash the password
            const hashedPassword = await hash(createUserDto.password, 10); // Use bcrypt to hash the password with a salt round of 10
            
            // Create a new user object with the hashed password
            const newUser = new this.UserModel({
                ...createUserDto,
                password: hashedPassword // Replace the plain text password with the hashed password
            });

            // Save the user to the database
            return await newUser.save();
        } catch (error) {
            // Log the error for debugging
            console.error('Error creating user:', error);
            throw error; // Rethrow the error to propagate it up the call stack
        }
    }
    

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.UserModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!updatedUser) throw new NotFoundException('User Not Found');
        return updatedUser;
    }

    async delete(id: string): Promise<User> {
        const removedUser = await this.findOne(id);
        await this.UserModel.findByIdAndDelete(id).exec();
        return removedUser;
    }
}
