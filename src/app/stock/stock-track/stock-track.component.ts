import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatestWith, Subscription } from 'rxjs';

import { CompanyModel, CompanyResponseModel } from 'src/app/shared/models/company.model';
import { QuoteModel } from 'src/app/shared/models/quote.model';
import { StockDetailsModel } from 'src/app/shared/models/stock-details.model';
import { StockService } from '../stock.service';
import{ LocalStorageEnum } from 'src/app/shared/enums/local-storage.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-track',
  templateUrl: './stock-track.component.html',
  styleUrls: ['./stock-track.component.css']
})
export class StockTrackComponent implements OnInit, OnDestroy {
  
  @ViewChild('trackSymbol', {static:true}) refSymbol : ElementRef;

  subscriptionSearch : Subscription;

  constructor(private stockService : StockService, private toast : ToastrService) { }

  ngOnInit(): void {
  }

  trackStock(){
    let searchValue = this.refSymbol.nativeElement.value;
    if(searchValue && searchValue != null && searchValue!== "" && searchValue.trim() != ""){
      this.searchQuoteDataAndCompanyName(searchValue);
    }else{
      //error popup
      this.toast.error("Invalid Search", "ERROR");
    }
  }

  searchQuoteDataAndCompanyName(symbol : string){

    const quoteDataObservable = this.stockService.getCurrentStockQuoteData(symbol);
    const companyDataObservable = this.stockService.getCompanyName(symbol);

    this.subscriptionSearch = quoteDataObservable.pipe(combineLatestWith(companyDataObservable)).subscribe(([quoteDataRes, companyDataRes] : [QuoteModel, CompanyModel]) => {
      if(quoteDataRes && quoteDataRes !== null && companyDataRes && companyDataRes !== null){
        const stockDetails : StockDetailsModel = {
          symbol : symbol,
          quote : quoteDataRes,
          company : companyDataRes
        }
        this.saveStockDetailsToLocalStorage(stockDetails);
      } else if(quoteDataRes === null){
        //error popup
        this.toast.error("Something Going Wrong With quoteData", "ERROR");
      } else if(companyDataRes === null){
        //error popup
        this.toast.error("Something Going Wrong With companyData", "ERROR");
      }
    }, error => {
      //error popup
      console.log(error);
      this.toast.error("Something Going Wrong", "ERROR");
    });

  }

  saveStockDetailsToLocalStorage(stockDetails : StockDetailsModel){

    let tmpStocks : StockDetailsModel[] = this.stockService.getStockDataFromLocalStorage();
    if(tmpStocks && tmpStocks != null && tmpStocks.length > 0){
      let filterStockIsExists : StockDetailsModel = tmpStocks.filter(x => x.symbol === stockDetails.symbol)[0];
      if(filterStockIsExists && filterStockIsExists !== null){
        //error popup
        this.toast.error("This Stock Already Exists", "ERROR");
      }else{
        // tmpStocks.push(stockDetails);
        tmpStocks.unshift(stockDetails);
        this.stockService.setStockDataToLocalStorage(tmpStocks);
      }
    }else{
      this.stockService.setStockDataToLocalStorage([stockDetails]);
    }  
  }


  ngOnDestroy(): void {
    this.subscriptionSearch?.unsubscribe();
  }
}
