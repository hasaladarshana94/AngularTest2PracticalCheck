import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

import { DateFormatEnum } from 'src/app/shared/enums/date-format.enum';
import { SentimentModel, SentimentResponseModel } from 'src/app/shared/models/sentiment.model';
import { StockDetailsModel } from 'src/app/shared/models/stock-details.model';
import { DateService } from 'src/app/shared/services/date.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-sentiment-information',
  templateUrl: './stock-sentiment-information.component.html',
  styleUrls: ['./stock-sentiment-information.component.css']
})
export class StockSentimentInformationComponent implements OnInit, OnDestroy {

  symbol : string;
  stockDetails : StockDetailsModel = null;
  sentimentDetails : SentimentModel[] = [];
  isDataFound : boolean = false;

  private unsubscribe : Subject<boolean> = new Subject<boolean>();

  sentimentDetailsLoading : boolean = false;
  stockDataLoading : boolean = false;

  constructor(private router : Router, private route : ActivatedRoute, 
    private stockService : StockService, private dateService : DateService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => {
      this.symbol = params['symbol'] !== undefined && params['symbol'] !== null ? params['symbol'] : null;
      this.getSentmentDetails();
      this.getStockData();    
    });
  }

  getStockData(){
    this.stockDataLoading = true;
    if(this.symbol && this.symbol !== null && this.symbol !== ""){
      this.stockDetails = null;
      this.stockDetails = this.stockService.getStockDataFromLocalStorageBySymbol(this.symbol);
      if(!this.stockDetails || this.stockDetails === null){
        //error popup
        this.isDataFound = false;
        this.toastr.error("No Data Found", "ERROR");
      }else{
        this.isDataFound = true;
      }
      this.stockDataLoading = false;
    }else{
      //error popup
      this.stockDataLoading = false;
      this.toastr.error("Invalid Symbol", "ERROR");
    }
  }

  getSentmentDetails(){
    this.sentimentDetailsLoading = true;
    const today : string = new Date().toString();
    if(this.symbol && this.symbol !== null && this.symbol !== ""){
      const fromDate : string = this.dateService.getmothsBeforeDateFormatted(new Date(today), 3, DateFormatEnum.DATE_NORMAL);
      const toDate : string = this.dateService.getmothsBeforeDateFormatted(new Date(today), 1, DateFormatEnum.DATE_NORMAL);

      this.stockService.getSentimentDetails(this.symbol, fromDate, toDate).pipe(takeUntil(this.unsubscribe)).subscribe((sentimentData : SentimentResponseModel) => {
        if(sentimentData && sentimentData !== null && sentimentData.data !== null && sentimentData.data.length > 0){
          this.sentimentDetails = [];
          this.sentimentDetails = sentimentData.data;
        }
        this.sentimentDetailsLoading = false;
      }, error => {
        //error popup
        this.sentimentDetailsLoading = false;
        console.log(error);
        this.toastr.error("Something Going Wrong", "ERROR");
      });
    }else{
      this.sentimentDetailsLoading = false;
      this.toastr.error("Invalid Symbol", "ERROR");
    }
  }

  ngOnDestroy(){
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  navigateToHome(){
    this.router.navigate([''],{relativeTo : this.route});
  }

  get Loading(): boolean{
    return (this.sentimentDetailsLoading || this.stockDataLoading);
  }


}
