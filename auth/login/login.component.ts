import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
//import { MustMatch } from '../../service/must-match.validator';
import { UserService } from '../../service/User.service';
import { LoginModel } from '../../models/Login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error : boolean;
  message = "";
 
  constructor(private formBuilder: FormBuilder,
              private UserService : UserService,
              private router : Router) { }

  ngOnInit() {
    this.InitForm();
    this.error = false;
  }

  InitForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]],
      //confirmPassword: ['', Validators.required]
     }//,{
    //   validator: MustMatch('password','confirmPassword')
    //   }
    );
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    const login = new LoginModel(username, password);
      
    this.UserService.SignIn(login).subscribe(
      (res)=>{
        if(res === 'Server Error' || res === 'Username Not Found !!' || res === 'Password incorrect !!'){
          this.message = res.toString();
          this.error = true;  
        }else{
          sessionStorage.setItem('token', res.toString());
          this.router.navigate(['/services']);    
        }
      },(error)=>{
        console.log(error);
      }
    );
}

onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
