import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translation',
  standalone: true
})
export class TranslationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
