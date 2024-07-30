import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserResponse, UserService } from './user.service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserResponse;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseAuthUrl = 'http://45.130.148.137:8080/api/Auth';
  public userBehavior: BehaviorSubject<UserResponse | null> = new BehaviorSubject<UserResponse | null>(null);

  constructor(private http: HttpClient,
    private userService: UserService
  ) {
    userService.getMe().subscribe({
      next: (user: UserResponse) => {
        this.userBehavior.next(user);
      },
      error: () => {
        this.userBehavior.next(null);
      }
    });
   }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseAuthUrl}/sign-in`, loginRequest);
  }
}
