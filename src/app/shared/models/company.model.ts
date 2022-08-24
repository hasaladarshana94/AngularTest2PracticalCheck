export interface CompanyModel{
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string
}

export interface CompanyResponseModel{
    count? : number,
    result? : CompanyModel[]
}