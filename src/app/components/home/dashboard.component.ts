import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../shared/company.service';
import { StockService } from '../../shared/stock.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <div style="padding:1rem">
      <h3>Dashboard</h3>
      <p>Companies: {{companiesCount}}</p>
      <p>Stocks: {{stocksCount}}</p>
    </div>
  `,
  providers: [CompanyService, StockService]
})
export class DashboardComponent implements OnInit {
  companiesCount = 0;
  stocksCount = 0;

  constructor(private cs: CompanyService, private ss: StockService) {}

  ngOnInit(): void {
    this.cs.list().subscribe(c => (this.companiesCount = c.length));
    this.ss.list().subscribe(s => (this.stocksCount = s.length));
  }
}
