import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../../models/endpoints.model';
import { ExchangeRates } from '../../models/exchange-rates.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  constructor(private http: HttpClient) { }

  fetchExchangeRates(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(Endpoints.EXCHANGE_RATES);
  }
}
