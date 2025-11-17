import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../shared/stock.service';
import { Stock } from '../../models/stock.model';

@Component({
  standalone: true,
  selector: 'app-stock-detail',
  imports: [CommonModule],
  template: `
    <div style="padding:1rem">
      <button (click)="back()">Back</button>
      <div *ngIf="stock">
  <h3>Stock for {{stock.companyId}} on {{stock.date}}</h3>
  <p>Open: {{stock.openValue}}</p>
  <p>High: {{stock.highValue}}</p>
  <p>Low: {{stock.lowValue}}</p>
  <p>Close: {{stock.closeValue}}</p>
  <p>Volume: {{stock.volume}}</p>
      </div>
    </div>
  `,
  providers: [StockService]
})
export class StockDetailComponent implements OnInit {
  stock!: Stock;

  constructor(private route: ActivatedRoute, private svc: StockService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.svc.get(Number(id)).subscribe((s) => (this.stock = s));
    }
  }

  back() {
    this.router.navigate(['/stocks']);
  }
}
