import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    console.log('log out ');
    this.authService.logout();
     this.router.navigate(['/']);
  }
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
