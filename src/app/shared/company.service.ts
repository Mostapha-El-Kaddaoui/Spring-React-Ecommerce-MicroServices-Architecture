import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  // Backend controller base URL
  private base = 'http://localhost:8091/api/companies';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
  }

  list(): Observable<Company[]> {
    console.log('Fetching companies from:', this.base);
    return this.http.get<Company[]>(this.base, this.getHeaders());
  }

  get(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.base}/${id}`, this.getHeaders());
  }

  create(payload: Partial<Company>): Observable<Company> {
    return this.http.post<Company>(this.base, payload, this.getHeaders());
  }

  update(id: number, payload: Partial<Company>): Observable<Company> {
    return this.http.put<Company>(`${this.base}/${id}`, payload, this.getHeaders());
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`, this.getHeaders());
  }
}
