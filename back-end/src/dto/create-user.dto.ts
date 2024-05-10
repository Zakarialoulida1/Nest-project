import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
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
