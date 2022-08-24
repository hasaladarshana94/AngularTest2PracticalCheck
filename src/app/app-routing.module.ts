import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockComponent } from './stock/stock.component';
import { StockSentimentInformationComponent } from './stock/stock-sentiment-information/stock-sentiment-information.component';
import { ErrorMessageComponent } from './error-message/error-message.component';

const route : Routes = [
  {
    path : '',
    component : StockComponent
  },
  {
    path : 'sentiment/:symbol',
    component : StockSentimentInformationComponent
  },
  {
    path : 'not-found',
    component : ErrorMessageComponent,
    data : {message: 'Page Not Found'}
  },
  {
    path : '**',
    redirectTo : '/not-found'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(route)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
