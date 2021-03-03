import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentGroupComponent } from './components/comment-group/comment-group.component';
import { SingleCommentComponent } from './components/single-comment/single-comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { AmountPipe } from './pipes/amount.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CostsContainerComponent,
    CostGroupComponent,
    SingleCostComponent,
    AmountFormatDirective,
    CommentGroupComponent,
    SingleCommentComponent,
    CommentFormComponent,
    AmountPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    CostsService,
    ExchangeRatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
