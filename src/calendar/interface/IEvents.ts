export interface IEvent{
    _id?:string
    title:string,
    notes:string,
    start:Date,
    end: Date,
    bgColor:string,
    user:IUser
}

export interface IEventCreation{
    title:string,
    notes:string,
    start:Date,
    end: Date,
}

interface IUser{
    _id:string,
    name:string
}

export interface IEventCreationResp{
    "ok": boolean,
    "eventSaved": {
        "title": string,
        "notes": string,
        "start": Date,
        "end": Date,
        "_id": string,
        "user":string,
        "__v": number
    }
}

export interface IEvents{
    ok:boolean,
    events:IEvent[]
}

export interface IEventUpdateResp{
    "ok": boolean,
    "eventoActualizado": {
        "_id": string,
        "title": string,
        "notes": string,
        "start": string,
        "end": string,
        "user": string,
        "__v": string
    }
}