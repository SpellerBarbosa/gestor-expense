import { Types } from "mongoose"

export interface IUser{
    _id?: string,
    user: string,
    name: string,
    password: string,
    confirm_password: string
}

export interface IExpense{
    _id?: Types.ObjectId,
    category: string,
    description: string,
    value:number,
    date: Date,
    userId: string
}

export interface IProfile{
    _id: string | undefined
    name: string | undefined
    user: string | undefined
}