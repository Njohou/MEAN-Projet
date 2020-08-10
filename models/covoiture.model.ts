export class CovoitureProfil{
    _id : String

    constructor(
        public username : String,
        public immatriculation : String,
        public placedispo : number,
        public dateDepart : Date,
        public posteDate : Date,
        public destination : String,
        public chauffeur : String       
         ){}         
 }