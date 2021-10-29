import { Controller, Get, Post, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query, Put } from '@nestjs/common';

import { CreateUser } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){

    }

    @Post('/create')
    async createPost(@Res() res, @Body() createUsers: CreateUser){
        console.log(createUsers);
        const users = await this.userService.createUser(createUsers)
        return res.status(HttpStatus.OK).json({
            message: 'Create Ok',
            user: users
        });
    }
    @Get('/')
    async getUsers(@Res() res){
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json({
            users
        })
    }
    @Get('/:userID')
    async getUser(@Res() res, @Param('userID') userID){
        const users = await this.userService.getUser(userID);
        if(!users) throw new NotFoundException('not exists');
        return res.status(HttpStatus.OK).json({
            users
        });
    }
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID) {
        const userDeleted = await this.userService.delUser(userID);
        if (!userDeleted) throw new NotFoundException('userID does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            userDeleted
        });
    }
    @Put('/update')
    async updateUser(@Res() res, @Body() createUser: CreateUser, @Query('userID') userID) {
        const updateUser = await this.userService.updateUser(userID, createUser);
        if (!updateUser) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'User Updated Successfully',
            updateUser 
        });
    }
}
