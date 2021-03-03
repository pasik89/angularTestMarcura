import { Component, Input } from '@angular/core';
import { CostGroup } from '../../models/costs.model';
import { ExchangeRates } from '../../models/exchange-rates.model';

@Component({
  selector: 'app-cost-group',
  templateUrl: './cost-group.component.html',
  styleUrls: ['./cost-group.component.scss']
})
export class CostGroupComponent {
  @Input() costGroup: CostGroup;
  @Input() daCurrency: string;
  @Input() selectedCurrency: string;
  @Input() exchangeRates: ExchangeRates;

  constructor() { }
}
