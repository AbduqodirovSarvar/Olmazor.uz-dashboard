import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EnumResponse {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private baseApiUrl: string = 'http://45.130.148.137:8080/api';

  constructor(private http: HttpClient) { }

  getEnums(): Observable<EnumResponse[]> {
    return this.http.get<EnumResponse[]>(this.baseApiUrl);
  }
}
