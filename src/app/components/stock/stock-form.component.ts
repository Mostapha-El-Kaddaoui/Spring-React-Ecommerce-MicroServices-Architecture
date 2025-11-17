import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock } from '../../models/stock.model';

@Component({
  standalone: true,
  selector: 'app-stock-form',
  template: `
    <form (ngSubmit)="submit()">
      <label>Date: <input type="date" [(ngModel)]="model.date" name="date" /></label>
      <label>Close: <input type="number" [(ngModel)]="model.closeValue" name="close"/></label>
      <button type="submit">Save</button>
    </form>
  `
})
export class StockFormComponent {
  @Input() model!: Partial<Stock>;
  @Output() save = new EventEmitter<Partial<Stock>>();

  submit() {
    this.save.emit(this.model);
  }
}
