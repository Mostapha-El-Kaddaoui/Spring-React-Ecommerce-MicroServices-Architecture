import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.model';

@Injectable({ providedIn: 'root' })
export class StockService {
  private base = '/api/stocks';

  constructor(private http: HttpClient) {}

  private createHeaders() {
    return { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  }

  list(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.base);
  }

  get(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.base}/${id}`);
  }

  create(payload: Partial<Stock>): Observable<Stock> {
    return this.http.post<Stock>(this.base, payload, this.createHeaders());
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
