import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../shared/company.service';

@Component({
  standalone: true,
  selector: 'app-company-detail',
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding:1rem">
      <button (click)="back()">Back</button>
      <div *ngIf="company">
        <h3>{{company.name}}</h3>
        <p>Domain: {{company.domain}}</p>
        <p>Current Price: {{company.currentPrice | number:'1.2-2'}}</p>
        <label>Update Price: <input type="number" [(ngModel)]="company.currentPrice" /></label>
        <button (click)="save()">Save</button>
      </div>
    </div>
  `,
  providers: [CompanyService]
})
export class CompanyDetailComponent implements OnInit {
  company!: Company;

  constructor(private route: ActivatedRoute, private svc: CompanyService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.svc.get(Number(id)).subscribe((c) => (this.company = c));
    } else {
      // new
      this.company = { id: 0, name: '', ipoDate: new Date().toISOString(), currentPrice: 0 } as Company;
    }
  }

  save() {
    if (!this.company) return;
    if (this.company.id && this.company.id > 0) {
      this.svc.update(this.company.id, this.company).subscribe(() => this.router.navigate(['/companies']));
    } else {
      this.svc.create(this.company).subscribe(() => this.router.navigate(['/companies']));
    }
  }

  back() {
    this.router.navigate(['/companies']);
  }
}
