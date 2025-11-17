import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock.model';

@Injectable({ providedIn: 'root' })
export class StockService {
  private base = 'http://localhost:8092/api/stocks';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
  }

  list(): Observable<Stock[]> {
    console.log('Fetching stocks from:', this.base);
    return this.http.get<Stock[]>(this.base, this.getHeaders());
  }

  get(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${this.base}/${id}`, this.getHeaders());
  }

  create(payload: Partial<Stock>): Observable<Stock> {
    return this.http.post<Stock>(this.base, payload, this.getHeaders());
  }

  update(id: number, payload: Partial<Stock>): Observable<Stock> {
    return this.http.put<Stock>(`${this.base}/${id}`, payload, this.getHeaders());
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`, this.getHeaders());
  }

  getCompanyInfo(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.base}/${companyId}/company`, this.getHeaders());
  }
}
