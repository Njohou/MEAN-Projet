import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from './service/User.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TransApp';

  isAuth : boolean;
  username = '';

  // get the username and affich it on html page
  constructor(private userService : UserService,
              private router : Router)
              {
                this.InitUsername();
              }

  ngOnInit(){
    $(document).ready(function(){
      // navbar slide toogle
      $('i.icon').click(function(){
          $('.nav-list').slideToggle()
      });
      //stickey NavBar
      $(window).scroll(function(){
        var sc = $(this).scrollTop()
        if(sc > 50){
          $('header').addClass('sticky');
        }else{
          $('header').removeClass('sticky');
        }
      });
    });
    this.userService.refreshUsername.subscribe(
      ()=>{
        this.InitUsername();
      })
    this.InitUsername();
  }

 private InitUsername(){
    this.userService.getUsername().subscribe(
      data => { this.username = data.toString();this.isAuth = true },
      error => { this.router.navigate(['/login']); }
    );
  }

  // sign out the user session, and delete a token in localstorage
  SignOut(){
    sessionStorage.removeItem('token');
    this.isAuth = false;
    this.router.navigate(['/login']);
  }

}
