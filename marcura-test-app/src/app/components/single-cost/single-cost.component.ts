import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { Subject } from 'rxjs';
import Decimal from 'decimal.js';
import { CostItem, CostType } from '../../models/costs.model';
import { ExchangeRates } from '../../models/exchange-rates.model';
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

  screenedCostValue: { screenedValue: string, screenedValueInUSD: string };
  quotedCostValue: { quotedValue: string, quotedValueInUSD: string };
  quotedCost: string;
  screenedCost: string;
  quotedCostInUSD: string;
  screenedCostInUSD: string;
  screenedCostInput: string;
  commentCount: number;
  commentIcon = faCommentAlt;
  isCommentSectionVisible = true;

  screenedCostValue$: Subject<{ screenedValue: string, screenedValueInUSD: string }> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.getQuotedCost();
    this.getScreenedCost();

    this.commentCount = this.cost.comments ? this.cost.comments.length : 0;
    this.screenedCostInput = this.screenedCost;
    this.screenedCostInUSD = this.exchangeCostToUSD(this.selectedCurrency, this.screenedCostInput);

    this.screenedCostValue$ = new Subject<{screenedValue: string; screenedValueInUSD: string}>();
    this.setCostsValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getQuotedCost();
    this.getScreenedCost();
    this.getScreenedInputCost();
    this.quotedCostInUSD = this.exchangeCost('USD', CostType.QUOTED);
    this.screenedCostInUSD = this.exchangeCostToUSD(this.selectedCurrency, this.screenedCostInput);

    this.setCostsValues();
  }

  onChange(event): void {
    this.screenedCostInUSD = this.exchangeCostToUSD(this.selectedCurrency, event);
    this.setCostsValues();
  }

  getQuotedCost(): void {
    this.quotedCost = this.exchangeCost(this.selectedCurrency, CostType.QUOTED);
  }

  getScreenedCost(): void {
    this.screenedCost = this.exchangeCost(this.selectedCurrency, CostType.SCREENED);
  }

  getScreenedInputCost(): void {
    this.screenedCostInput = this.exchangeInputCost(this.selectedCurrency, this.screenedCostInput);
  }

  exchangeCost(currency: string, type: CostType): string {
    const costToExchange = this.cost.costs.filter(cost => cost.type === type)[0];
    const toCurrency = this.exchangeRates.paymentCurrencies.filter(currencyObj => currencyObj.toCurrency === currency);

    return Decimal.mul(coerceNumberProperty(costToExchange.amount), coerceNumberProperty(toCurrency[0].exchangeRate)).toNumber().toFixed(2);
  }

  exchangeInputCost(currency: string, value: string): string {
    const toCurrency = this.exchangeRates.paymentCurrencies.filter(currencyObj => currencyObj.toCurrency === currency);

    return Decimal.mul(coerceNumberProperty(value), coerceNumberProperty(toCurrency[0].exchangeRate)).toNumber().toFixed(2);
  }

  exchangeCostToUSD(currency: string, value?: string): string {
    const valueToExchange = parseFloat(value);
    const baseExchangeRate = this.exchangeRates.paymentCurrencies.filter(currencyObj => currencyObj.toCurrency === currency)[0];
    const baseValue = Decimal.div(coerceNumberProperty(valueToExchange), coerceNumberProperty(baseExchangeRate.exchangeRate))
      .toNumber()
      .toFixed(4);
    const toCurrency = this.exchangeRates.paymentCurrencies.filter(currencyObj => currencyObj.toCurrency === 'USD');

    return Decimal.mul(coerceNumberProperty(baseValue), coerceNumberProperty(toCurrency[0].exchangeRate)).toNumber().toFixed(2);
  }

  showCommentSection(): void {
    this.isCommentSectionVisible = !this.isCommentSectionVisible;
  }

  setCostsValues(): void {
    this.screenedCostValue = { screenedValue: this.screenedCostInput, screenedValueInUSD: this.screenedCostInUSD };
    this.quotedCostValue = { quotedValue: this.quotedCost, quotedValueInUSD: this.quotedCostInUSD };
    this.screenedCostValue$.next({ screenedValue: this.screenedCostInput, screenedValueInUSD: this.screenedCostInUSD });
  }
}
