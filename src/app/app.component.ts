import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompanyListComponent } from './components/company/company-list.component';
import { StockListComponent } from './components/stock/stock-list.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, NavbarComponent, CompanyListComponent, StockListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-adria-test';
  currentView: 'companies' | 'stocks' = 'companies';

  switchView(view: 'companies' | 'stocks'): void {
    this.currentView = view;
  }
}
