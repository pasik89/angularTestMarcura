import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CostsService } from '../services/costs/costs.service';
import { CostsResponse } from '../models/costs.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CostsResolver implements Resolve<CostsResponse> {
  constructor(private costsService: CostsService) {}

  resolve(): Observable<CostsResponse> {
    return this.costsService.fetchCosts();
  }
}
