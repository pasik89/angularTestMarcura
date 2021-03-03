import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostsResolver } from './resolvers/costs.resolver';
import { ExchangeRatesResolver } from './resolvers/exchange-rates.resolver';
import { CostsContainerComponent } from './components/costs-container/costs-container.component';

const routes: Routes = [
  {
    path: '',
    component: CostsContainerComponent,
    resolve: {
      costs: CostsResolver,
      exchangeRates: ExchangeRatesResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: CostsResolver
    },
    {
      provide: ExchangeRatesResolver
    }
  ]
})

export class AppRoutingModule { }
