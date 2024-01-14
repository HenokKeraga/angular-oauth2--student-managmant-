import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

const authCodeFlowConfig: AuthConfig = {
  clientId: 'oidc-client',
  redirectUri: 'http://localhost:4200/home',
  scope: 'openid',
  issuer: 'http://localhost:8080',
  // issuer: 'http://localhost:9999',
  responseType: 'code',
  showDebugInformation: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenEndpoint = 'http://localhost:8080/oauth2/token'; // Your token endpoint
 // private tokenEndpoint = 'http://localhost:9999/oauth2/token'; // Your token endpoint
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private oauthService: OAuthService,
    private httpClient: HttpClient,
    private oauthStorage: OAuthStorage,
    private cookieService: CookieService
  ) {}

  login() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.initLoginFlow();
  }
  logout() {
    this.oauthService.logOut();
    this.oauthStorage.removeItem('access_token');
    this.oauthStorage.removeItem('PKCE_verifier');
    this.oauthStorage.removeItem('nonce');
    this.cookieService.set('test', 'Hello World');
    this.cookieService.delete('JSESSIONID');
    this.cookieService.deleteAll();
    this.isUserLoggedIn.next(false);
  }

  exchangeCodeForToken(code: string, pkceVerifier: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa('oidc-client:secret'),
     
    });


  

    const { clientId = '', redirectUri = '' } = authCodeFlowConfig;

    console.log(clientId, redirectUri);

    const params = new HttpParams()
      .set('code', code)
      .set('client_id', clientId)
      .set('grant_type', 'authorization_code')
      .set('redirect_uri', redirectUri) // Your redirect URI
      .set('code_verifier', pkceVerifier);

    return this.httpClient.post(this.tokenEndpoint, params.toString(), {
      headers,
    });
  }
}
