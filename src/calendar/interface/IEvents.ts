export interface IEvent{
    _id?:string
    title:string,
    note:string,
    start:Date,
    end: Date,
    bgColor:string,
    user:IUser
}

export interface IEventCreation{
    title:string,
    note:string,
    start:Date,
    end: Date,
}

interface IUser{
    _id:string,
    name:string
}