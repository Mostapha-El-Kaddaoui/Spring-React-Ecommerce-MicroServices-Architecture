import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div style="padding:1rem;">
      <h2>Welcome to the Stock Management UI</h2>
      <p>Use the navigation to browse companies, stocks, or chat with the AI assistant.</p>
    </div>
  `
})
export class HomeComponent {}
