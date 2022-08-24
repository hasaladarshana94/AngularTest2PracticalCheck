import { QuoteModel } from "./quote.model";
import{CompanyModel} from "./company.model";

export interface StockDetailsModel {
    symbol : string,
    quote? : QuoteModel,
    company? : CompanyModel
}