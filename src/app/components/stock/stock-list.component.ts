import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../shared/stock.service';
import { Stock } from '../../models/stock.model';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-stock-list',
  imports: [CommonModule],
  template: `
    <div style="padding:1rem">
      <h3>Stocks</h3>
      <button (click)="create()">Add Stock</button>
      <ul>
        <li *ngFor="let s of stocks" (click)="open(s)">{{s?.date}} - {{s?.closeValue}}</li>
      </ul>
    </div>
  `,
  providers: [StockService]
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(private svc: StockService, private router: Router) {}

  ngOnInit(): void {
    this.svc.list().subscribe((s) => (this.stocks = s));
  }

  open(s: Stock) {
    this.router.navigate(['/stocks', s.id]);
  }

  create() {
    this.router.navigate(['/stocks', 'new']);
  }
}
