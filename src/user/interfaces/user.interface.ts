import { Document } from "mongoose";

export interface User extends Document{
    readonly name:string;
    readonly phone: number;
    readonly age: number;
    readonly createAt: Date;
}