import { Injectable, Delete } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUser } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async getUsers(): Promise<User[]>{
        const users = await this.userModel.find();
        return users;
    }
    async getUser(userID:string): Promise<User>{
        const user = await this.userModel.findById(userID);
        return user;
    }
    async createUser(createUser: CreateUser): Promise<User>{
        const user = new this.userModel(createUser);
        return await user.save();
    }
    async delUser(userID: string): Promise<User>{
        const delUser = await this.userModel.findByIdAndDelete(userID);
        return delUser;
    }
    async updateUser(userID: string, createUser: CreateUser):  Promise<User>{
        const updateUser = await this.userModel.findByIdAndUpdate(userID, createUser, {new:true});
        return updateUser;
    }

}
