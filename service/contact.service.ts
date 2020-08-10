import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommentModel } from '../models/comment.model';
import { Mailrecommend } from '../models/mailRecomment.model';
import { Subject } from 'rxjs';
import {tap} from 'rxjs/operators' 

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
            private httpclient : HttpClient,
            private router : Router) { }

  private _refreshList = new Subject<void>();

  // refresh list of comments
  get refreshList(){
    return this._refreshList;
  }

  addComment(comment : CommentModel){
    return this.httpclient.post('http://localhost:3000/contact/saveComment',comment)
    .pipe(
      tap(()=>{
        this._refreshList.next();
      })
    );
  }

  // show the comment in comment's space
  getComment(){
    return this.httpclient.get('http://localhost:3000/contact/getComment');
  }

  //send mail and preoccupation
  sendMailContact(contact : Mailrecommend){
    return this.httpclient.post('http://localhost:3000/contact/sendmail',contact);
  }

  // get specific comment
  CommentUser(username : String){
    return this.httpclient
    .get('http://localhost:3000/contact/commentUser/'+username);
  }

}
