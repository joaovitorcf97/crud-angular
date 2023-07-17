import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case 'fron-end':
        return 'code';
      case 'back-end':
        return 'computer';
      case 'mobile':
        return 'mobile';
    }
    return 'code';
  }
}
