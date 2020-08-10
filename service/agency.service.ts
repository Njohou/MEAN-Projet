import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TicketModel } from '../models/Ticket.model';
import { TicketAllerRetourModel } from '../models/TicketAller-Retour.model'
import { AgencePrograms } from '../models/agencePrograms.model';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {


  constructor(private router : Router,
              private httpclient : HttpClient) { }

  getAgency(code : number){
    return this.httpclient
          .get('http://localhost:3000/agency/viewAgency/'+code);
  }

  /**  Agencies' Ticket    */
  SendReservationBus( TicketAS : TicketModel){
    return this.httpclient.post('http://localhost:3000/reservationBus/TicketAllerSimple', TicketAS);
  }
  /**   End  */

  /**  Agencies' Ticket    */
  SendReservationBusAller_Retour( TicketAR : TicketAllerRetourModel){
    return this.httpclient.post('http://localhost:3000/reservationBus/TicketAllerRetour', TicketAR);
  }
  /**   End  */

  /** get all reservations of a user **/
  
  GetReservation(username : String){
    return this.httpclient
    .get('http://localhost:3000/reservationBus/getReservation/'+username);
  }

  /** End */

  /**  Research a programs   */
  ProgramsResearch(programs : AgencePrograms){
    //console.log('Hello world !!');
    return this.httpclient
    .post('http://localhost:3000/reservationBus/ResearchPrograms', programs);
  }
  /**  End  **/
}
