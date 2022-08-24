import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StockDetailsModel } from 'src/app/shared/models/stock-details.model';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  @Input() stockDetail : StockDetailsModel;

  constructor( private stockService : StockService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
  }

  deleteStock(symbol : string){
    if(symbol && symbol!== null && symbol !== ""){
      this.stockService.deleteStock(symbol);
    }else{
      //error popup
    }
  }

  navigateToSocialSentiment(){
    if(this.stockDetail?.symbol && this.stockDetail?.symbol !== null && this.stockDetail?.symbol !== ""){
      this.router.navigate(['/sentiment',this.stockDetail.symbol],{relativeTo : this.route});
    }else{
      //error popup
    }
  }

}
