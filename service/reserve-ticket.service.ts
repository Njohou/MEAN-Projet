import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ReservationModel } from '../models/reservation.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReserveTicketService {

  constructor(private httpclient : HttpClient,
              private router : Router) { }

  /**  Carpooling    */
  reserveCarpooling(reserve : ReservationModel){
    return this.httpclient.post('http://localhost:3000/reservation/reserveCovoiture', reserve);
  }

  SendMailandQrcode(reserve : ReservationModel){
    return this.httpclient.post('http://localhost:3000/reservation/MailCarpooler', reserve);
  }
  /**  End  */

}
