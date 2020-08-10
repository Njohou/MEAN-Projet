export class User{
    _id : String
    constructor(public username : String,
                public email : String,
                public telephone : Number,
                public password : String
                ){}
    photo : String
}