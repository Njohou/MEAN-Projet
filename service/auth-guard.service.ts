import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './User.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router : Router,
              private userService : UserService) { }

  canActivate() : Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject)=>{
        this.userService.getUsername().subscribe(
          (data)=>{
            if(data){
              resolve(true);
            }else{
              this.router.navigate(['/login']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
