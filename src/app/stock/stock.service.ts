import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, Subject } from 'rxjs';

import { AppConfiguration } from '../app-configuration.service';
import { LocalStorageEnum } from '../shared/enums/local-storage.enum';
import { CompanyModel, CompanyResponseModel } from '../shared/models/company.model';
import { SentimentResponseModel } from '../shared/models/sentiment.model';
import { StockDetailsModel } from '../shared/models/stock-details.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  refreshQuotesSubject : Subject<boolean> = new Subject<boolean>();

  constructor(private http : HttpClient, private configuration : AppConfiguration,
    private toast : ToastrService) { }

  getCurrentStockQuoteData(symbol : string): Observable<any>{
    let url = this.configuration.QuoteUrl + "?symbol=" + symbol;
    return this.http.get(url);
  }

  getCompanyName(symbol : string): Observable<CompanyModel>{
    let url = this.configuration.SymbolLookupUrl + "?q=" + symbol;
    return this.http.get(url).pipe(map((res : CompanyResponseModel) => {
      const filteredCompany = res.result.filter(x => x.symbol === symbol)[0];
      return filteredCompany;
    }));
  }

  getSentimentDetails(symbol : string, fromDate : string, toDate : string): Observable<SentimentResponseModel>{
    let url = this.configuration.SentimentUrl + "?symbol="+ symbol +"&from="+fromDate+"&to="+toDate;
    return this.http.get(url);
  }

  //get stock data from local storage
  getStockDataFromLocalStorage() : StockDetailsModel[]{
    let returnDto : StockDetailsModel[] = []
    let stockDetalsStr : string = localStorage.getItem(LocalStorageEnum.STOCK_DATA.toString());
    if(stockDetalsStr && stockDetalsStr !== null){
      returnDto = JSON.parse(stockDetalsStr);
    }    
    return returnDto;
  }

  getStockDataFromLocalStorageBySymbol(symbol : string) : StockDetailsModel {
    let returnDto : StockDetailsModel = null;   
    let stocks = this.getStockDataFromLocalStorage();
    if(stocks && stocks !== null && stocks.length > 0){
      returnDto = stocks.filter(x => x.symbol === symbol)[0];
    }
    return returnDto;
  }

  //replace data from local storage
  setStockDataToLocalStorage(stockDetails : StockDetailsModel[]){
    if(stockDetails !== null && stockDetails.length > 0){
      const stockDtlJsonStr = JSON.stringify(stockDetails);
      localStorage.removeItem(LocalStorageEnum.STOCK_DATA.toString());
      localStorage.setItem(LocalStorageEnum.STOCK_DATA.toString(), stockDtlJsonStr);
      this.refreshQuotesSubject.next(true);
    }
  }

  deleteStock(symbol : string){
    let tmpStocks : StockDetailsModel[] = this.getStockDataFromLocalStorage();
    if(tmpStocks && tmpStocks != null && tmpStocks.length > 0){
      let filterStockIsExists : StockDetailsModel = tmpStocks.filter(x => x.symbol === symbol)[0];
      if(filterStockIsExists && filterStockIsExists !== null){
        const index = tmpStocks.indexOf(filterStockIsExists);
        if(index > -1){
          tmpStocks.splice(index, 1);
          this.setStockDataToLocalStorage(tmpStocks);
          this.toast.success("Deleted", "Success");
        }
      }
    }
  }


}
