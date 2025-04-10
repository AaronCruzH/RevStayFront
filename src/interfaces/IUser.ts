export interface IUser{
    userID:number,
    firstName:string,
    lastName:string,
    email:string,
    userType: "USER"|"OWNER"|"ADMIN" | "UNAUTHENTICATED"
    password:string,
    accessToken:string
}