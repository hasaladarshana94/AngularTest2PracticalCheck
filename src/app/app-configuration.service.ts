import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppConfiguration {
    public readonly  SymbolLookupUrl : string = "https://finnhub.io/api/v1/search";
    public readonly  QuoteUrl : string = "https://finnhub.io/api/v1/quote";
    public readonly  SentimentUrl : string = "https://finnhub.io/api/v1/stock/insider-sentiment";
}