import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../shared/stock.service';
import { Stock } from '../../models/stock.model';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-stock-list',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="stock-container">
      <div class="stock-header">
        <h2 class="title">Stock Management</h2>
        <button class="btn-primary" (click)="openCreateModal()">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Stock
        </button>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading stocks...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="error && !loading" class="error-state">
        <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>{{ error }}</p>
        <button class="btn-retry" (click)="loadStocks()">Retry</button>
      </div>

      <!-- Empty State -->
      <div *ngIf="!loading && !error && stocks.length === 0" class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="9" x2="15" y2="9"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
        <p>No stocks found. Create one to get started!</p>
      </div>

      <!-- Table -->
      <div *ngIf="!loading && !error && stocks.length > 0" class="table-wrapper">
        <table class="stocks-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company ID</th>
              <th>Date</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of stocks" class="stock-row">
              <td class="cell-id">{{ s.id }}</td>
              <td class="cell-company">{{ s.companyId }}</td>
              <td class="cell-date">{{ s.date | date: 'MMM d, y' }}</td>
              <td class="cell-price">{{ '$' }}{{ s.openValue | number:'1.2-2' }}</td>
              <td class="cell-price">{{ '$' }}{{ s.highValue | number:'1.2-2' }}</td>
              <td class="cell-price">{{ '$' }}{{ s.lowValue | number:'1.2-2' }}</td>
              <td class="cell-price-close">
                <span class="price-badge">{{ '$' }}{{ s.closeValue | number:'1.2-2' }}</span>
              </td>
              <td class="cell-volume">{{ s.volume | number }}</td>
              <td class="cell-actions">
                <button class="btn-small btn-edit" (click)="edit(s)" title="Edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button class="btn-small btn-delete" (click)="remove(s)" title="Delete">
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

      <!-- Modal for Add/Edit -->
      <div *ngIf="showModal" class="modal-overlay" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ isEditMode ? 'Edit Stock' : 'Add New Stock' }}</h3>
            <button class="btn-close" (click)="closeModal()">×</button>
          </div>

          <form class="modal-form" (ngSubmit)="saveStock()">
            <div class="form-group">
              <label>Company ID</label>
              <input
                type="number"
                [(ngModel)]="formData.companyId"
                name="companyId"
                required
              />
            </div>

            <div class="form-group">
              <label>Date</label>
              <input
                type="date"
                [(ngModel)]="formData.date"
                name="date"
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Open Value</label>
                <input
                  type="number"
                  step="0.01"
                  [(ngModel)]="formData.openValue"
                  name="openValue"
                  required
                />
              </div>
              <div class="form-group">
                <label>High Value</label>
                <input
                  type="number"
                  step="0.01"
                  [(ngModel)]="formData.highValue"
                  name="highValue"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Low Value</label>
                <input
                  type="number"
                  step="0.01"
                  [(ngModel)]="formData.lowValue"
                  name="lowValue"
                  required
                />
              </div>
              <div class="form-group">
                <label>Close Value</label>
                <input
                  type="number"
                  step="0.01"
                  [(ngModel)]="formData.closeValue"
                  name="closeValue"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label>Volume</label>
              <input
                type="number"
                [(ngModel)]="formData.volume"
                name="volume"
                required
              />
            </div>

            <div class="modal-footer">
              <button type="button" class="btn-secondary" (click)="closeModal()">
                Cancel
              </button>
              <button type="submit" class="btn-primary">
                {{ isEditMode ? 'Update Stock' : 'Create Stock' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stock-container {
      padding: 2rem;
    }

    .stock-header {
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

    .icon {
      width: 20px;
      height: 20px;
      stroke-width: 2.5;
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

    .table-wrapper {
      overflow-x: auto;
    }

    .stocks-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
    }

    .stocks-table thead {
      background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%);
      border-bottom: 2px solid #1976d2;
    }

    .stocks-table th {
      padding: 1.25rem 1rem;
      text-align: left;
      font-weight: 700;
      color: #333;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 0.85rem;
    }

    .stock-row {
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      border-bottom: 1px solid #e0e0e0;
    }

    .stock-row:hover {
      background-color: #f9f9f9;
      box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.02);
    }

    .stocks-table td {
      padding: 1.25rem 1rem;
      color: #333;
    }

    .cell-id {
      font-weight: 600;
      color: #1976d2;
    }

    .cell-company {
      font-weight: 600;
      color: #666;
    }

    .cell-date {
      color: #666;
    }

    .cell-price {
      color: #555;
      font-weight: 500;
    }

    .cell-price-close {
      font-weight: 600;
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

    .cell-volume {
      color: #666;
      font-weight: 500;
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

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .modal-header h3 {
      margin: 0;
      font-size: 1.5rem;
      color: #333;
    }

    .btn-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #999;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .btn-close:hover {
      color: #333;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .modal-form {
      padding: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }

    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 0.95rem;
      transition: border-color 0.3s ease;
    }

    .form-group input:focus {
      outline: none;
      border-color: #1976d2;
      box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding: 2rem;
      border-top: 1px solid #e0e0e0;
    }

    .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      background: white;
      color: #333;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-secondary:hover {
      background: #f5f5f5;
      border-color: #999;
    }

    @media (max-width: 768px) {
      .stock-header {
        flex-direction: column;
        align-items: stretch;
      }

      .btn-primary {
        justify-content: center;
        width: 100%;
      }

      .stocks-table {
        font-size: 0.85rem;
      }

      .stocks-table th,
      .stocks-table td {
        padding: 0.75rem 0.5rem;
      }

      .cell-actions {
        gap: 0.25rem;
      }

      .btn-small {
        width: 32px;
        height: 32px;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .modal-content {
        width: 95%;
      }
    }
  `],
  providers: [StockService]
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];
  loading: boolean = true;
  error: string | null = null;
  showModal: boolean = false;
  isEditMode: boolean = false;

  formData: Partial<Stock> = {};

  constructor(private svc: StockService, private router: Router) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.loading = true;
    this.error = null;

    console.log('Starting to load stocks...');

    this.svc.list().subscribe({
      next: (data) => {
        console.log('✓ Stocks loaded successfully:', data);
        console.log('Data length:', data ? data.length : 0);

        if (Array.isArray(data)) {
          this.stocks = data;
          console.log('✓ Stocks array set:', this.stocks.length, 'items');
        } else {
          console.warn('⚠ Data is not an array:', data);
          this.stocks = Array.isArray(data) ? data : [];
        }

        this.loading = false;
        console.log('✓ Loading complete');
      },
      error: (err) => {
        console.error('✗ Error loading stocks:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);

        this.error = 'Failed to load stocks. Make sure the API is running at http://localhost:8092';
        this.loading = false;
      }
    });
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.formData = {
      date: new Date().toISOString().split('T')[0]
    };
    this.showModal = true;
  }

  edit(stock: Stock): void {
    this.isEditMode = true;
    this.formData = { ...stock };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.formData = {};
  }

  saveStock(): void {
    if (!this.formData.companyId || !this.formData.date) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.isEditMode && this.formData.id) {
      this.updateStock();
    } else {
      this.createStock();
    }
  }

  private createStock(): void {
    console.log('Creating stock:', this.formData);

    this.svc.create(this.formData).subscribe({
      next: (newStock) => {
        console.log('✓ Stock created successfully:', newStock);
        this.stocks.push(newStock);
        this.closeModal();
      },
      error: (err) => {
        console.error('✗ Error creating stock:', err);
        alert('Failed to create stock. Please try again.');
      }
    });
  }

  private updateStock(): void {
    if (!this.formData.id) return;

    console.log('Updating stock:', this.formData);

    this.svc.update(this.formData.id, this.formData).subscribe({
      next: (updatedStock) => {
        console.log('✓ Stock updated successfully:', updatedStock);
        const index = this.stocks.findIndex(s => s.id === updatedStock.id);
        if (index > -1) {
          this.stocks[index] = updatedStock;
        }
        this.closeModal();
      },
      error: (err) => {
        console.error('✗ Error updating stock:', err);
        alert('Failed to update stock. Please try again.');
      }
    });
  }

  remove(stock: Stock): void {
    if (!confirm(`Delete stock for company ${stock.companyId} on ${stock.date}?`)) return;

    console.log('Deleting stock with ID:', stock.id);

    this.svc.delete(stock.id).subscribe({
      next: () => {
        console.log('✓ Stock deleted successfully');
        this.stocks = this.stocks.filter(s => s.id !== stock.id);
        console.log('✓ Stocks list updated. Remaining:', this.stocks.length);
      },
      error: (err) => {
        console.error('✗ Error deleting stock:', err);
        alert('Failed to delete stock. Please try again.');
      }
    });
  }
}
