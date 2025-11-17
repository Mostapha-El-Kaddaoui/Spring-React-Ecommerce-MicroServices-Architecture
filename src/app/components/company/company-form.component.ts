import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from '../../models/company.model';

@Component({
  standalone: true,
  selector: 'app-company-form',
  template: `
    <form (ngSubmit)="submit()">
      <label>Name: <input [(ngModel)]="model.name" name="name" /></label>
      <label>Domain: <input [(ngModel)]="model.domain" name="domain" /></label>
      <button type="submit">Save</button>
    </form>
  `
})
export class CompanyFormComponent {
  @Input() model!: Partial<Company>;
  @Output() save = new EventEmitter<Partial<Company>>();

  submit() {
    this.save.emit(this.model);
  }
}
