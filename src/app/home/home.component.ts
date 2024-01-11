import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private oauthStorage: OAuthStorage,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((paramMap) => {
      const authoriztionCode = paramMap['code'];
      const pkceVerifier = this.oauthStorage.getItem('PKCE_verifier');
      if (authoriztionCode && pkceVerifier) {
        console.log(authoriztionCode)
        console.log(pkceVerifier)
        this.authService
          .exchangeCodeForToken(authoriztionCode, pkceVerifier)
          .subscribe((res) => {
            console.log(res);
            
            this.oauthStorage.setItem('access_token', res.access_token);
          
            this.authService.isUserLoggedIn.next(true);
            this.router.navigate(['/students']);
          });
      } else {
        this.authService.isUserLoggedIn.next(false);
         console.error('error');
        this.router.navigate(['/login']);
       
      }
    });
  }
}
