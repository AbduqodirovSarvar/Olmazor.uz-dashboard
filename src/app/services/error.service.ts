import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router) { }

  public handleError(error: any): Observable<never> {
    if (error.status === 401) {
      // Token is expired or unauthorized
      this.router.navigate(['/auth']);
    }
    return throwError(() => {
      new Error(error.message);
    });
  }
}
