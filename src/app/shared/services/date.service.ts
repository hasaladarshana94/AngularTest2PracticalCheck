import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDateFormatted(date : Date , format : string) : string{
    return new DatePipe('en-US').transform(date, format);
  }

  getmothsBeforeDateFormatted(date : Date, months : number , format : string) : string{
    return new DatePipe('en-US').transform(new Date(date.setMonth(date.getMonth() - months)), format);
  }
}
