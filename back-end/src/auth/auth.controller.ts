
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: RegisterDto) {
      try {
          return await this.authService.signIn(signInDto.email, signInDto.password);
      } catch (error) {
        console.log(error);
        
          throw new UnauthorizedException('Invalid credentials');
      }
  }
  @Post('test')
  async testin(){
    console.log("data");
    const passwordMatch = await bcrypt.compare("azerty123", "$2b$10$1RQKyspcIgxsWQCxfqVdj.4527W/.JLB7aOBkb45Bxzv235pDWdbC");
    
   console.log("isPasswordValid" + passwordMatch);
    return passwordMatch ;
    
  }
  
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
  }


  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}


   

 
