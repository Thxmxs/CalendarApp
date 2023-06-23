export interface ILogin{
    email:string;
    password:string;
}

export interface ILoginPostResp{
    email:string,
    name:string,
    ok:boolean,
    token:string,
    _id:string
}

export interface IRegister{
    name:string;
    email:string;
    password:string;
    passwordRepeated:string
}

export interface IRegsiterPostResp{
        "ok": boolean,
        "user": {
            "_id":string,
            "name": string,
            "email": string
        },
        "token": string
}

export interface IRefreshTokenResp{
    ok: boolean,
    uid:string,
    name:string,
    token:string,
    email:string
}

export interface IUser{
    email:string,
    name:string,
    _id:string
}