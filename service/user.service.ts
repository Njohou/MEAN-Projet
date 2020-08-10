import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http'
import { User } from '../models/User.model';
import { LoginModel } from '../models/Login.model';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import {tap} from 'rxjs/operators' 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient : HttpClient,
              private router : Router) { }

  private _refreshUsername = new Subject<void>();

  get refreshUsername(){
    return this._refreshUsername;
  }


  addUser(user : User){
    return this.httpclient.post('http://localhost:3000/user/register', user).subscribe(
      (res)=>{
        if(res === 'Username or email already exists !!'){
          alert(res);
        }else{
          sessionStorage.setItem('token', res.toString());
          this._refreshUsername.next();
          this.router.navigate(['/services']);
          console.log(res.toString());
        }  
      },
      (error)=>{
        console.log('Echec de l\'enregistrement : ' + error);
      }
    );
  }


  SignIn(login : LoginModel){
    return this.httpclient.post('http://localhost:3000/user/login', login)
    .pipe(
      tap(()=>{
        this._refreshUsername.next();
      })
    );
  }

  getUsername(){
    return this.httpclient.get('http://localhost:3000/user/username', {
      observe: 'body',
      params : new HttpParams().append('token', sessionStorage.getItem('token'))
    });
  }

  getUserProfil(username : String){
    return this.httpclient
    .get('http://localhost:3000/user/userprofil/'+ username); // get user's profils
  }

  // delete user account
  DeleteUser(_id : String){
    return this.httpclient
    .delete('http://localhost:3000/user/deleteAccount/'+ _id)
    .subscribe(
      (res)=>{
        if(res === 'Delete done !!'){
          alert(res);
          sessionStorage.removeItem("token");
          this.router.navigate(['/login']);
        }
      },
      (error)=>{
        alert('Delete failed !!');
        console.log('Erreur de suppression : '+error)
      }
    )
  }

  UpdateUser(userupdate : User, id : String){
     return this.httpclient.put('http://localhost:3000/user/UpdateUser/'+id, userupdate);
  }


  SaveimageName(filename : String, username : String){
    const envoi = {
      filename : filename,
      username : username
    }
    return this.httpclient.put('http://localhost:3000/user/SaveImageName', envoi);
  }

}
