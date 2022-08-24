export interface SentimentModel {
    symbol : string,
    year? : number,
    month? : number,
    change? : number,
    mspr? : number
}

export interface SentimentResponseModel{
    data? : SentimentModel[],
    symbol? : string
}
