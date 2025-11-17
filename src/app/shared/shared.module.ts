import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './material.module';

@NgModule({
  imports: [CommonModule, SharedMaterialModule],
  exports: [CommonModule, SharedMaterialModule]
})
export class SharedModule {}
