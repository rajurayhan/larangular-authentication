import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;
  constructor(
      private auth: AuthService,
      private token : TokenService,
      private router: Router
    ) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(value => this.loggedIn = value)
  }

  logout(event: MouseEvent){
    event.preventDefault();
    this.auth.changeAuthStatus(false);
    this.token.remove('token');
    this.token.remove('issLogged');
    this.router.navigateByUrl('/login');
  }

}
