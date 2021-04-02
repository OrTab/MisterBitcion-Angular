import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor(private http: HttpClient) { }

  public getRate(coins: number) {
    console.log(coins);
    return this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)

  }

  public getMarketPriceStat() {
    return this.http.get<{ values, name, description, options: [] }>('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
      .pipe(
        map(res => {
          return { name: res.name, title: res.description, data: res.values, options: [] }
        })
      )
  }
  public getTransactionsPerDay() {
    return this.http.get<{ values, name, description, options: [] }>(' https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&format=json&cors=true')
      .pipe(
        map(res => {
          return { name: res.name, title: res.description, data: res.values, options: [] }
        })
      )
  }
}
