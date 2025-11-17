import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a routerLink="/" class="brand">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          StockSys
        </a>
        <div class="links">
          <a routerLink="/companies" class="nav-link">Companies</a>
          <a routerLink="/stocks" class="nav-link">Stocks</a>
          <a routerLink="/chatbot" class="nav-link">Chatbot</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .navbar-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: white;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.5px;
      transition: transform 0.3s ease;
    }

    .brand:hover {
      transform: scale(1.05);
    }

    .logo-icon {
      width: 28px;
      height: 28px;
      stroke-width: 2;
    }

    .links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      position: relative;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 1rem;
      width: calc(100% - 2rem);
      height: 2px;
      background: white;
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 0.3s ease;
    }

    .nav-link:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    .nav-link:hover::after {
      transform: scaleX(1);
    }

    @media (max-width: 768px) {
      .navbar-container {
        flex-direction: column;
        gap: 1rem;
      }

      .links {
        gap: 1rem;
      }
    }
  `]
})
export class NavbarComponent {}
