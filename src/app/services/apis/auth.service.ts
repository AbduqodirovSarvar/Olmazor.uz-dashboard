import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstname: {
      en: string;
      uz: string;
      ru: string;
      uzru: string;
    };
    lastname: {
      en: string;
      uz: string;
      ru: string;
      uzru: string;
    };
    phone: string;
    gender: {
      id: number;
      name: string;
    };
    photo: string | null;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    userrole: {
      id: number;
      name: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseAuthUrl = 'http://45.130.148.137:8080/api/Auth';

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseAuthUrl}/sign-in`, loginRequest);
  }
}
