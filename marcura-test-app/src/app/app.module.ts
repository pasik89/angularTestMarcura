import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CostsService } from './services/costs/costs.service';
import { HttpClientModule } from '@angular/common/http';
import { ExchangeRatesService } from './services/exchange-rates/exchange-rates.service';
import { CostsContainerComponent } from './components/costs-container/costs-container.component';
import { CostGroupComponent } from './components/cost-group/cost-group.component';
import { SingleCostComponent } from './components/single-cost/single-cost.component';
import { AmountFormatDirective } from './components/directives/amount-format.directive';

@NgModule({
  declarations: [
    AppComponent,
    CostsContainerComponent,
    CostGroupComponent,
    SingleCostComponent,
    AmountFormatDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    CostsService,
    ExchangeRatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
