import { Schema } from "mongoose";


export const UserSchema =  new Schema({
    name: {type: String, required: true},
    phone: Number,
    age: Number,
    createAt: {
        type: Date,
        default: Date.now
    }
})