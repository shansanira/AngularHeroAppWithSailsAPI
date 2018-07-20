import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  static filter(items: Array<{ [key: string]: any }>, term: string): Array<{ [key: string]: any }> {

    const toCompare = term.toLowerCase();

    return items.filter(function (item: any) {
      for (const property in item) {
        if (item[property] === null || item[property] === undefined) {
          continue;
        }
        if (item[property].toString().toLowerCase().includes(toCompare)) {
          return true;
        }
      }
      return false;
    });
  }

  /**
   * @param items object from array
   * @param term term's search
   */
  transform(items: any, term: string): any {
    if (!term || !items) { return []; }

    return FilterPipe.filter(items, term);
  }

}


//   transform(items: any[], field: string, value: string): any[] {
//     if (!items) {
//         return [];
//     }
//     if (!field || !value) {
//         return items;
//     }

//     return items.filter(singleItem => singleItem[field].toLowerCase().includes(value.toLowerCase()));
// }

