import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../service/contact.service';
import { CommentModel } from '../../models/comment.model';
import { Mailrecommend } from '../../models/mailRecomment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/User.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm : FormGroup;
  commentForm : FormGroup;
  dateNow = new Date();
  LoginUsername = "";
  Comments : CommentModel[];
  succesMessage = "";
  vrai : boolean;


  constructor(private formBuilder: FormBuilder,
              private ContactService : ContactService,
              private userService : UserService,
              private router : Router) { 
                this.userService.getUsername().subscribe(
                  data => { this.LoginUsername = data.toString(); },
                  error => { console.log(error) })
               }



  ngOnInit(): void {
    // refresh comment after post
    this.ContactService.refreshList
    .subscribe(()=>{
      this.getComment();
    });

    this.InitCommentForm();
    this.InitContactForm();
    this.getComment();
    this.vrai = false;
  }

  InitContactForm(){
    this.contactForm = this.formBuilder.group({
      message : ['', Validators.required]
    });
  }

  InitCommentForm(){
    this.commentForm = this.formBuilder.group({
      post : ['', Validators.required]
    });
  }

  onSubmitContact(){
    const message = this.contactForm.get('message').value;

    console.log(message+','+this.LoginUsername);
    const contact = new Mailrecommend(this.LoginUsername, message);

    this.ContactService.sendMailContact(contact).subscribe(
      (res)=>{
        this.succesMessage = res.toString();
        this.vrai = true;
      },
      (error)=>{
        console.log(error);
      })
  }

  onSubmitComment(){
    const post = this.commentForm.get('post').value;

    console.log(this.LoginUsername +','+post);
    const comment = new CommentModel(this.LoginUsername, post, this.dateNow);

    this.ContactService.addComment(comment).subscribe(
      (res)=>{
        console.log(res);
      },(error)=>{
        console.log(error);
      }
    )
  }


 private getComment(){
    this.ContactService.getComment().subscribe(
     (comment : CommentModel[])=>{
      this.Comments = comment;
     });
  }

}
