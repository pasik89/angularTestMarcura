import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { ExchangeRatesService } from '../services/exchange-rates/exchange-rates.service';
import { ExchangeRates } from '../models/exchange-rates.model';
import { mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ExchangeRatesResolver implements Resolve<ExchangeRates> {
  constructor(private exchangeRatesService: ExchangeRatesService) {}

  resolve(): Observable<ExchangeRates> {
    return this.exchangeRatesService.fetchExchangeRates().pipe(
      take(1),
      mergeMap(exchangeRates => {
        if (exchangeRates) {
          return of(exchangeRates);
        }

        return EMPTY;
      })
    );
  }
}
