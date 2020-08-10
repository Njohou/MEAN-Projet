import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MustMatch } from '../../service/must-match.validator';
import { UserService } from '../../service/User.service';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
 
  constructor(private formBuilder: FormBuilder, 
              private UserService : UserService,
              private router : Router) { }

  ngOnInit() {
    this.InitForm();
  }

  InitForm(){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },{
      validator: MustMatch('password','confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    const username = this.registerForm.get('username').value;
    const email = this.registerForm.get('email').value;
    const telephone = this.registerForm.get('telephone').value;
    const password = this.registerForm.get('password').value;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    const user = new User(
    username,email,telephone,password
    );

    this.UserService.addUser(user)
}

onReset() {
    this.submitted = false;
    this.registerForm.reset();
}

}
