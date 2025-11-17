import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.model';

@Injectable({ providedIn: 'root' })
export class StockService {
  private baseUrl = '/api/stocks';

  constructor(private http: HttpClient) {}

  list(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.baseUrl);
  }

  get(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.baseUrl}/${id}`);
  }

  create(stock: Partial<Stock>): Observable<Stock> {
    return this.http.post<Stock>(this.baseUrl, stock);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
