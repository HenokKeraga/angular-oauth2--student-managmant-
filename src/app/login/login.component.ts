import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isUserLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}


  login() {
    console.log('log in');
    this.authService.login();
  }
  ngOnInit(): void {
    this.authService.isUserLoggedIn.subscribe((isLogged) => {
      this.isUserLoggedIn = isLogged;
    });
  }
}
