import { Component, OnInit } from '@angular/core';
import { CostsResponse } from '../../models/costs.model';
import { ExchangeRates } from '../../models/exchange-rates.model';
import { ActivatedRoute } from '@angular/router';
import Decimal from 'decimal.js';
import { coerceNumberProperty } from '../../helpers/coercion-number-property';

@Component({
  selector: 'app-costs-container',
  templateUrl: './costs-container.component.html',
  styleUrls: ['./costs-container.component.scss']
})
export class CostsContainerComponent implements OnInit {
  costs: CostsResponse;
  exchangeRates: ExchangeRates;
  selectedCurrency: string;
  currencyExchangeRate: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.costs = this.route.snapshot.data['costs'];
    this.exchangeRates = this.route.snapshot.data['exchangeRates'];
    this.selectedCurrency = this.exchangeRates.sourceCurrency;
    this.exchangeCurrencyToBaseCurrency(this.selectedCurrency);
  }

  onChange(currency: string): void {
    this.exchangeCurrencyToBaseCurrency(currency);
  }

  get currencies(): string[] {
    return this.exchangeRates.paymentCurrencies.map(exchangeRates => exchangeRates.toCurrency);
  }

  exchangeCurrencyToBaseCurrency(currency: string): void {
    const toCurrency = this.exchangeRates.paymentCurrencies.filter(currencyObj => currencyObj.toCurrency === currency);
    const baseExchangeRate = this.costs.baseCurrency.exchangeRate;
    const baseValue = Decimal.div(coerceNumberProperty(1), coerceNumberProperty(baseExchangeRate)).toNumber().toFixed(4);

    this.currencyExchangeRate = Decimal.mul(coerceNumberProperty(baseValue), coerceNumberProperty(toCurrency[0].exchangeRate))
      .toNumber()
      .toFixed(4);
  }
}
