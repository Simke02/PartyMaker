import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: any[], propName: string): any[] {
    const resultArray = [];
    if(value.length === 0 || filterString.length === 0 || propName === ''){
      return value;
    }
    for(let i = 0; i < filterString.length; i++){
      for(const item of value){
        if(item[propName] === filterString[i]){
          resultArray.push(item);
        }
      }
    }

    return resultArray;
  }

}
