import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { StockModule } from './stock/stock.module';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    StockModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
