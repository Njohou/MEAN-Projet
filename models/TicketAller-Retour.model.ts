export class TicketAllerRetourModel {
    
    constructor(
       public username : String,
       public agence : String,
       public Trajet : String,
       public Heuredepart : String,
       public Jour : String,
       public Prix : number,
       public Place : number,
       public PrixTotal : number,
       public ReturnDate : Date
    ){}
}