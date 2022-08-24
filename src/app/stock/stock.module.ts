import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { StockSentimentInformationComponent } from './stock-sentiment-information/stock-sentiment-information.component';
import { StockComponent } from './stock.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { StockTrackComponent } from './stock-track/stock-track.component';
import { AuthInterceptorService } from '../shared/interceptors/auth-interceptor.service';
import { MonthStrPipe } from '../shared/pipes/month-str.pipe';
import { AppChangeTextColorDirective } from '../shared/directive/app-change-text-color.directive';



@NgModule({
  declarations: [
    StockComponent,
    StockDetailComponent,
    StockTrackComponent,
    StockSentimentInformationComponent,
    MonthStrPipe,
    AppChangeTextColorDirective
  ],
  imports: [
    CommonModule
  ],
  providers : [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : AuthInterceptorService,
      multi : true
    }
  ]
})
export class StockModule { }
