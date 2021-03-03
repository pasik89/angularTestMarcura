import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostsResponse } from '../../models/costs.model';
import { Endpoints } from '../../models/endpoints.model';

@Injectable({
  providedIn: 'root'
})

export class CostsService {

  constructor(private http: HttpClient) { }

  fetchCosts(): Observable<CostsResponse> {
    return this.http.get<CostsResponse>(Endpoints.COSTS);
  }
}
