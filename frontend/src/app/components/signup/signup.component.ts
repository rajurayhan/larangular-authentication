import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'src/app/services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };
  // public error: any = {
  //   name: null,
  //   email: null,
  //   password: null
  // };
  public error = [];
  constructor(
    private jarwis : JarwisService,
    private token : TokenService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.jarwis.signUp(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)

    );
  }

  handleError(error){
    console.log(error);
    this.error = error.error.errors;
  }

  handleResponse(data){
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

}
