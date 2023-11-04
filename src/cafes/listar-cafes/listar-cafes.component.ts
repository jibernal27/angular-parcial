import { Component, OnInit } from '@angular/core';

import { Cafe } from 'src/models/Cafe';
import { CafesService } from '../cafes.service';

@Component({
  selector: 'app-listar-cafes',
  templateUrl: './listar-cafes.component.html',
  styleUrls: ['./listar-cafes.component.scss'],
})
export class ListarCafesComponent implements OnInit {
  cafes: Cafe[] = [];
  estaCargando: boolean = false;
  huboError: boolean = false;
  constructor(private cafeService: CafesService) {}

  ngOnInit() {
    this.getCafes();
  }

  getCafes() {
    this.estaCargando = true;
    this.cafeService.getCafes().subscribe({
      next: (cafes) => {
        this.estaCargando = false;
        this.cafes = cafes;
      },
      error: (_error) => {
        this.estaCargando = false;
        this.huboError = true;
      },
    });
  }
}
