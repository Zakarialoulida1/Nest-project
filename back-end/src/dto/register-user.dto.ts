import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6) 
    password: string;

    @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {
        message: 'Valid role required'
    })
    role: "INTERN" | "ENGINEER" | "ADMIN";
}
