import { Pipe, PipeTransform } from '@angular/core';
import { MonthsEnum } from '../enums/months.enum';

@Pipe({
  name: 'monthstr'
})
export class MonthStrPipe implements PipeTransform {

  transform(value :any, ...args: unknown[]):string {
    if(value && value != null && !isNaN(+value)){
      let returnVal = null;
      switch(Number(value)) {
        case 1: returnVal = MonthsEnum.JANUARY; break;
        case 2: returnVal = MonthsEnum.FEBRUARY; break;
        case 3: returnVal = MonthsEnum.MARCH; break;
        case 4: returnVal = MonthsEnum.APRIL; break;
        case 5: returnVal = MonthsEnum.MAY; break;
        case 6: returnVal = MonthsEnum.JUNE; break;
        case 7: returnVal = MonthsEnum.JULY; break;
        case 8: returnVal = MonthsEnum.AUGUST; break;
        case 9: returnVal = MonthsEnum.SEPTEMBER; break;
        case 10: returnVal = MonthsEnum.OCTOBER; break;
        case 11: returnVal = MonthsEnum.NOVEMBER; break;
        case 12: returnVal = MonthsEnum.DECEMBER; break;
        default : returnVal = null
      }
      return returnVal;
    }else{
      return null;
    }
  }

}
