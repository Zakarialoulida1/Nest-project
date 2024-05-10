import { Body, Controller, Delete, Get, Param, ParseIntPipe,ValidationPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get() //Get/users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINNER' | 'ADMIN') {
        return this.usersService.findAll(role)
    }



    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }
    @Post()
    create(@Body(ValidationPipe) createuserdto: CreateUserDto) {
        return this.usersService.createUser(createuserdto)
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) updateuserdto: UpdateUserDto){

        return this.usersService.update(id, updateuserdto)
    }
    @Delete(':id')  //Get/users/:id
    delete(@Param('id') id: string) {
        return this.usersService.delete(id)
    }

}
