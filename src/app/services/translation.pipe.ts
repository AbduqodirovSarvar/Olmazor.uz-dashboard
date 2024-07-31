import { Pipe, PipeTransform } from '@angular/core';
import { HelperService } from './helper.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'translation',
  standalone: true
})
export class TranslationPipe implements PipeTransform {
  languageCode: string;

  constructor(private helperService: HelperService) {
    this.languageCode = this.helperService.getLanguageCode();
  }

  transform(value: string): Observable<string> {
    return this.helperService.getJsonData(this.languageCode).pipe(
      map(data => {
        const keys = value.split('.');
        let translation = data;
        for (const key of keys) {
          translation = translation ? translation[key] : null;
        }
        return translation ?? value;
      }),
      catchError(() => of(value))
    );
  }
}
