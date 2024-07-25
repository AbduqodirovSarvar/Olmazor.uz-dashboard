import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptorService implements HttpInterceptor {

  private readonly token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE0OWIzOWE3LTcwOTMtNDU2OS1iN2I0LWM5MGM4ZTk0ZThlOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJOb25lIiwiU3VwZXJBZG1pbiIsIkFkbWluIl0sImp0aSI6IjZhYzlmNzA0LTMxYWMtNDYzMC05NjA3LTYxY2RlNjZlZTMzMCIsIm5hbWUiOiI3LzI1LzIwMjQgNToxODo1MyBBTSIsImV4cCI6MTcyMTk3MTEzMywiaXNzIjoiaHR0cHM6Ly9PbG1hdGVjaC51eiIsImF1ZCI6Imh0dHBzOi8vT2xtYXRlY2gudXoifQ.QHoAERpW_U6JU36l0aagmAVeofK58G2dBp2JHJEA45E';

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });

    return next.handle(authReq);
  }
}
