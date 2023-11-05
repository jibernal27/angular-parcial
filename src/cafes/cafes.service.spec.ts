/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CafesService } from './cafes.service';
import { Cafe } from 'src/models/Cafe';

describe('Service: Cafes', () => {
  let service: CafesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CafesService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CafesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Debe listar los cafes', () => {
    const mockCafes: Cafe[] = [
      {
        id: 1,
        nombre: 'Café Especial para tí',
        tipo: 'Blend',
        region: 'Angelópolis, Antioquia',
        sabor: 'Panela, Durazno, Caramelo',
        altura: 1920,
        imagen:
          'https://cdn.shopify.com/s/files/1/0272/2873/3504/products/cafe-especial-para-ti-colores-cafe-colombiano-f_1_720x.jpg',
      },
      {
        id: 2,
        nombre: 'Café Especial Navegante',
        tipo: 'Café de Origen',
        region: 'Guatapé, Antioquia',
        sabor: 'Cítrico, Naranja, Cacao',
        altura: 1800,
        imagen:
          'https://cdn.shopify.com/s/files/1/0272/2873/3504/products/cafe-especial-navegante-cafe-colombiano-f_540x.png',
      },
    ];

    service.getCafes().subscribe((cafes) => {
      expect(cafes.length).toBe(2);
      expect(cafes).toEqual(mockCafes);
    });

    const req = httpMock.expectOne(service.cafeUrl); //Hace la solciutd correct
    expect(req.request.method).toBe('GET');
    req.flush(mockCafes);
  });
});
