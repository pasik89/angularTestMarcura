import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CostItem, CostType } from '../../models/costs.model';
import { ExchangeRates } from '../../models/exchange-rates.model';
import Decimal from 'decimal.js';
import { coerceNumberProperty } from '../../helpers/coercion-number-property';

@Component({
  selector: 'app-single-cost',
  templateUrl: './single-cost.component.html',
  styleUrls: ['./single-cost.component.scss']
})
export class SingleCostComponent implements OnInit, OnChanges {
  @Input() cost: CostItem;
  @Input() daCurrency: string;
  @Input() selectedCurrency: string;
  @Input() exchangeRates: ExchangeRates;
  quotedCost: string;
  screenedCost: string;
  quotedCostInUSD: string;
  screenedCostInUSD: string;
  screenedCostInput: string;

  constructor() { }

  ngOnInit(): void {
    this.getQuotedCost();
    this.getScreenedCost();

    this.screenedCostInput = this.screenedCost;
    this.quotedCostInUSD = this.exchangeCostInUSD(this.daCurrency, this.quotedCost);
    this.screenedCostInUSD = this.exchangeCostInUSD(this.selectedCurrency, this.screenedCostInput);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getQuotedCost();
    this.getScreenedCost();
    this.quotedCostInUSD = this.exchangeCostInUSD(this.daCurrency, this.quotedCost);
    this.screenedCostInUSD = this.exchangeCostInUSD(this.selectedCurrency, this.screenedCostInput);
  }

  onChange(event): void {
    this.screenedCostInUSD = this.exchangeCostInUSD(this.selectedCurrency, event);
  }

  get exchangeQuotedCostInUSD(): string {
    const costToExchange = this.cost.costs.filter(cost => cost.type === CostType.QUOTED)[0];
    const toCurrency = this.exchangeRates.paymentCurrencies.filter(currencyObj => currencyObj.toCurrency === 'USD');

    return Decimal.mul(coerceNumberProperty(costToExchange.amount), coerceNumberProperty(toCurrency[0].exchangeRate)).toNumber().toFixed(2);
  }

  getQuotedCost(): void {
    this.quotedCost = this.exchangeCost(this.selectedCurrency, CostType.QUOTED);
  }

  getScreenedCost(): void {
    this.screenedCost = this.exchangeCost(this.selectedCurrency, CostType.SCREENED);
  }

  exchangeCost(currency: string, type: CostType): string {
    const costToExchange = this.cost.costs.filter(cost => cost.type === type)[0];
    const toCurrency = this.exchangeRates.paymentCurrencies.filter(currencyObj => currencyObj.toCurrency === currency);

    return Decimal.mul(coerceNumberProperty(costToExchange.amount), coerceNumberProperty(toCurrency[0].exchangeRate)).toNumber().toFixed(2);
  }


  exchangeCostInUSD(currency: string, value?: string): string {
    const valueToExchange = parseFloat(value);
    const baseExchangeRate = this.exchangeRates.paymentCurrencies.filter(currencyObj => currencyObj.toCurrency === currency)[0];
    const baseValue = Decimal.div(coerceNumberProperty(valueToExchange), coerceNumberProperty(baseExchangeRate.exchangeRate))
      .toNumber()
      .toFixed(4);
    const toCurrency = this.exchangeRates.paymentCurrencies.filter(currencyObj => currencyObj.toCurrency === 'USD');

    return Decimal.mul(coerceNumberProperty(baseValue), coerceNumberProperty(toCurrency[0].exchangeRate)).toNumber().toFixed(2);
  }
}
