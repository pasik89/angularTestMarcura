import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Decimal from 'decimal.js';
import { CostGroup } from '../../models/costs.model';
import { ExchangeRates } from '../../models/exchange-rates.model';
import { SingleCostComponent } from '../single-cost/single-cost.component';
import { coerceNumberProperty } from '../../helpers/coercion-number-property';

@Component({
  selector: 'app-cost-group',
  templateUrl: './cost-group.component.html',
  styleUrls: ['./cost-group.component.scss'],
})

export class CostGroupComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() costGroup: CostGroup;
  @Input() daCurrency: string;
  @Input() selectedCurrency: string;
  @Input() exchangeRates: ExchangeRates;
  @ViewChildren(SingleCostComponent, { emitDistinctChangesOnly: false }) singleCost: QueryList<SingleCostComponent>;

  totalQuotedCost: string;
  totalQuotedCostInUSD: string;
  totalScreenedCost: string;
  totalScreenedCostInUSD: string;

  screenedTotalValues: { screenedValue: string, screenedValueInUSD: string };
  quotedTotalValues: { quotedValue: string, quotedValueInUSD: string };

  unsubscribe$: Subject<void> = new Subject();

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.getTotalQuotedCosts();
    this.getTotalQuotedCostsInUSD();

    this.singleCost.forEach(cost => cost.screenedCostValue$.pipe(takeUntil(this.unsubscribe$)).subscribe(() =>     {
      this.getTotalScreenedCosts();
      this.getTotalScreenedCostsInUSD();
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cd.detectChanges();

    this.getTotalQuotedCosts();
    this.getTotalQuotedCostsInUSD();
    this.getTotalScreenedCosts();
    this.getTotalScreenedCostsInUSD();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTotalQuotedCosts(): void {
    this.totalQuotedCost = this.singleCost
      .map(cost => cost.quotedCostValue)
      .map(quotedCostValue => quotedCostValue.quotedValue)
      .map(cost => parseFloat(cost))
      .reduce((a, b) => Decimal.add(coerceNumberProperty(a), coerceNumberProperty(b)).toNumber().toFixed(2), '');
  }

  getTotalQuotedCostsInUSD(): void {
    this.totalQuotedCostInUSD = this.singleCost
      .map(cost => cost.quotedCostValue)
      .map(quotedCostValue => quotedCostValue.quotedValueInUSD)
      .map(cost => parseFloat(cost))
      .reduce((a, b) => Decimal.add(coerceNumberProperty(a), coerceNumberProperty(b)).toNumber().toFixed(2), '');
  }

  getTotalScreenedCosts(): void {
    this.totalScreenedCost = this.singleCost
      .map(cost => cost.screenedCostValue)
      .map(quotedCostValue => quotedCostValue.screenedValue)
      .map(cost => parseFloat(cost))
      .reduce((a, b) => Decimal.add(coerceNumberProperty(a), coerceNumberProperty(b)).toNumber().toFixed(2), '');
  }

  getTotalScreenedCostsInUSD(): void {
    this.totalScreenedCostInUSD = this.singleCost
      .map(cost => cost.screenedCostValue)
      .map(quotedCostValue => quotedCostValue.screenedValueInUSD)
      .map(cost => parseFloat(cost))
      .reduce((a, b) => Decimal.add(coerceNumberProperty(a), coerceNumberProperty(b)).toNumber().toFixed(2), '');
  }
}
