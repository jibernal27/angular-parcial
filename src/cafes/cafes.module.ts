import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCafesComponent } from './listar-cafes/listar-cafes.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ListarCafesComponent],
  exports: [ListarCafesComponent],
})
export class CafesModule {}
