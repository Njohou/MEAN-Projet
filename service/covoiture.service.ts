import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CovoitureProfil } from '../models/covoiture.model';
import { MinusModel } from '../models/Minus.model';

@Injectable({
  providedIn: 'root'
})
export class CovoitureService {

  covoiture : CovoitureProfil[] = [];
  covoitureSubject = new Subject<CovoitureProfil[]>();
  
  emitProfilSubject(){
    this.covoitureSubject.next(this.covoiture);
  }

  constructor(private httpclient : HttpClient,
              private router : Router) { }


  createProfil(covoitureur : CovoitureProfil){
    return this.httpclient.post('http://localhost:3000/covoiture/createProfil', covoitureur);
   }

  getProfil(){
    return this.httpclient
    .get('http://localhost:3000/covoiture/showProfil');
  }

  getProfilById(id : string){
    return this.httpclient
    .get('http://localhost:3000/covoiture/showProfil/'+ id);
  }

  MinusNumber(minus: MinusModel){
    return this.httpclient
    .post('http://localhost:3000/covoiture/Minus', minus)
    .subscribe(
      (res)=>{
        console.log(res);
      },(error)=>{
        console.log(error);
      }
    )
  }

  CarpoolerUser(username : String){
    return this.httpclient
    .get('http://localhost:3000/covoiture/getCarpoolerPost/'+ username);
  }
}
