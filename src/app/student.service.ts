import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Student } from './student/Student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(
    private oauthStorage: OAuthService,
    private httpClient: HttpClient
  ) {}

  getAllStudents() {
    const token: string = this.oauthStorage.getAccessToken();

   const headers: HttpHeaders = new HttpHeaders().set(
     'Authorization',
     'Bearer ' + token
   );
   console.log('Request Headers:', headers);
    return this.httpClient.get<Student[]>('http://localhost:9090/students', { headers });
  }
}
