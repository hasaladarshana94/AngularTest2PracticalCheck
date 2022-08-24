import { Component, OnInit } from '@angular/core';
import { StockDetailsModel } from '../shared/models/stock-details.model';
import { StockService } from './stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  stocks : StockDetailsModel[] = [];
  constructor(private stockService : StockService) {

  }

  ngOnInit(): void {
    this.loadAllQuotesFromLocalStorage();

    this.stockService.refreshQuotesSubject.subscribe(res => {
      if(res){
        this.loadAllQuotesFromLocalStorage();
      }
    });
  }

  loadAllQuotesFromLocalStorage(){
    this.stocks = this.stockService.getStockDataFromLocalStorage();
  }

}
