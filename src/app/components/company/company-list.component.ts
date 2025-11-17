import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../shared/company.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-company-list',
  imports: [CommonModule],
  template: `
    <div class="company-container">
      <div class="company-header">
        <h2 class="title">Companies</h2>
        <button class="btn-primary" (click)="create()">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Company
        </button>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading companies...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error && !loading" class="error-state">
        <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>{{ error }}</p>
        <button class="btn-retry" (click)="loadCompanies()">
          Retry
        </button>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && !error && companies.length === 0" class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="9" x2="15" y2="9"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
        <p>No companies found. Create one to get started!</p>
      </div>

      <!-- Table -->
      <div *ngIf="!loading && !error && companies.length > 0" class="table-wrapper">
        <table class="companies-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>IPO Date</th>
              <th>Current Price</th>
              <th>Domain</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of companies" class="company-row">
              <td class="cell-id">{{ c.id }}</td>
              <td class="cell-name">{{ c.name }}</td>
              <td class="cell-date">{{ c.ipoDate | date: 'MMM d, y' }}</td>
              <td class="cell-price">
                <span class="price-badge">{{ '$' }}{{ c.currentPrice | number:'1.2-2' }}</span>
              </td>
              <td class="cell-domain">
                <a [href]="'https://' + c.domain" target="_blank" rel="noopener">{{ c.domain }}</a>
              </td>
              <td class="cell-actions">
                <button class="btn-small btn-edit" (click)="edit(c)" title="Edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button class="btn-small btn-delete" (click)="remove(c)" title="Delete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .company-container {
      padding: 2rem;
    }

    .company-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      gap: 1rem;
    }

    .title {
      font-size: 2rem;
      color: #1976d2;
      margin: 0;
      font-weight: 700;
    }

    .btn-primary {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(25, 118, 210, 0.4);
    }

    .btn-primary:active {
      transform: translateY(0);
    }

    .icon {
      width: 20px;
      height: 20px;
      stroke-width: 2.5;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #999;
    }

    .empty-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 1rem;
      opacity: 0.3;
      stroke-width: 1.5;
    }

    .empty-state p {
      font-size: 1.1rem;
      margin: 0;
    }

    .loading-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #1976d2;
    }

    .spinner {
      width: 40px;
      height: 40px;
      margin: 0 auto 1rem;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #1976d2;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-state p {
      font-size: 1.1rem;
      margin: 0;
    }

    .error-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #c62828;
      background: #ffebee;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .error-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 1rem;
      stroke-width: 1.5;
    }

    .error-state p {
      font-size: 1rem;
      margin: 0 0 1.5rem 0;
      line-height: 1.5;
    }

    .btn-retry {
      background: #c62828;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-retry:hover {
      background: #b71c1c;
      transform: translateY(-2px);
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .companies-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
    }

    .companies-table thead {
      background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%);
      border-bottom: 2px solid #1976d2;
    }

    .companies-table th {
      padding: 1.25rem 1rem;
      text-align: left;
      font-weight: 700;
      color: #333;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 0.85rem;
    }

    .company-row {
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      border-bottom: 1px solid #e0e0e0;
    }

    .company-row:hover {
      background-color: #f9f9f9;
      box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.02);
    }

    .companies-table td {
      padding: 1.25rem 1rem;
      color: #333;
    }

    .cell-id {
      font-weight: 600;
      color: #1976d2;
    }

    .cell-name {
      font-weight: 600;
      color: #222;
    }

    .cell-date {
      color: #666;
    }

    .price-badge {
      display: inline-block;
      background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
      color: white;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .cell-domain a {
      color: #1976d2;
      text-decoration: none;
      transition: all 0.3s ease;
      padding-bottom: 2px;
      border-bottom: 1px solid transparent;
    }

    .cell-domain a:hover {
      border-bottom-color: #1976d2;
    }

    .cell-actions {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
    }

    .btn-small {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
    }

    .btn-edit {
      background: #e3f2fd;
      color: #1976d2;
      stroke-width: 2;
    }

    .btn-edit:hover {
      background: #1976d2;
      color: white;
    }

    .btn-delete {
      background: #ffebee;
      color: #c62828;
      stroke-width: 2;
    }

    .btn-delete:hover {
      background: #c62828;
      color: white;
    }

    .btn-small svg {
      width: 18px;
      height: 18px;
      stroke-width: inherit;
    }

    @media (max-width: 768px) {
      .company-header {
        flex-direction: column;
        align-items: stretch;
      }

      .btn-primary {
        justify-content: center;
        width: 100%;
      }

      .companies-table {
        font-size: 0.85rem;
      }

      .companies-table th,
      .companies-table td {
        padding: 0.75rem 0.5rem;
      }

      .cell-actions {
        gap: 0.25rem;
      }

      .btn-small {
        width: 32px;
        height: 32px;
      }
    }
  `],
  providers: [CompanyService]
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private svc: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.loading = true;
    this.error = null;
    
    console.log('Starting to load companies...');
    
    this.svc.list().subscribe({
      next: (data) => {
        console.log('✓ Companies loaded successfully:', data);
        console.log('Data length:', data ? data.length : 0);
        console.log('Data type:', typeof data);
        
        if (Array.isArray(data)) {
          this.companies = data;
          console.log('✓ Companies array set:', this.companies.length, 'items');
        } else {
          console.warn('⚠ Data is not an array:', data);
          this.companies = Array.isArray(data) ? data : [];
        }
        
        this.loading = false;
        console.log('✓ Loading complete');
      },
      error: (err) => {
        console.error('✗ Error loading companies:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        console.error('Error response:', err.error);
        
        this.error = 'Failed to load companies. Make sure the API is running at http://localhost:8091';
        this.loading = false;
      }
    });
  }

  open(c: Company) {
    this.router.navigate(['/companies', c.id]);
  }

  create() {
    this.router.navigate(['/companies', 'new']);
  }

  edit(c: Company) {
    this.router.navigate(['/companies', c.id]);
  }

  remove(c: Company) {
    if (!confirm('Delete company "' + c.name + '"?')) return;
    
    console.log('Deleting company with ID:', c.id);
    
    this.svc.delete(c.id).subscribe({
      next: () => {
        console.log('✓ Company deleted successfully');
        // Supprimer directement de la liste locale pour une mise à jour immédiate
        this.companies = this.companies.filter(company => company.id !== c.id);
        console.log('✓ Companies list updated. Remaining:', this.companies.length);
      },
      error: (err) => {
        console.error('✗ Error deleting company:', err);
        alert('Failed to delete company. Please try again.');
      }
    });
  }
}
