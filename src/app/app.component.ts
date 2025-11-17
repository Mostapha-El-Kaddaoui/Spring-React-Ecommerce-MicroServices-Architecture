import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompanyListComponent } from './components/company/company-list.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, NavbarComponent, CompanyListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-adria-test';
}
