import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schémas/user.schema';
import { RegisterDto } from 'src/dto/register-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new NotFoundException('not found');
        }
  console.log(user.password)
  console.log(password)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("isPasswordValid" + isPasswordValid);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('credentials');
        }

        const payload = { sub: user._id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
        // Check if the user with the provided email already exists
        const existingUser = await this.usersService.findOneByEmail(registerDto.email);
        if (existingUser) {
            throw new UnauthorizedException('Email is already registered');
        }

      
        

      
        // Create the new user with the hashed password
        // const newUser = await this.usersService.createUser({email: registerDto.email, password: hashedPassword, name :registerDto.name, role :registerDto.role });
        const newUser = await this.usersService.createUser(registerDto);

        // Generate JWT token for the new user using the new user's _id
        const payload = { sub: newUser._id, email: newUser.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
