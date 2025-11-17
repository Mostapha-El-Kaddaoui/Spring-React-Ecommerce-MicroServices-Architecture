import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private baseUrl = '/api/companies';

  constructor(private http: HttpClient) {}

  list(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseUrl);
  }

  get(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}/${id}`);
  }

  create(company: Partial<Company>): Observable<Company> {
    return this.http.post<Company>(this.baseUrl, company);
  }

  update(id: number, company: Partial<Company>): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}/${id}`, company);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // placeholder for JWT handling
  private authHeaders() {
    const token = localStorage.getItem('jwt');
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }
}
