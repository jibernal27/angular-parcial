/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { ListarCafesComponent } from './listar-cafes.component';
import { CafesService } from '../cafes.service';
import { generarCafes } from 'src/app/utils/faker-utils';
describe('ListarCafesComponent', () => {
  let component: ListarCafesComponent;
  let fixture: ComponentFixture<ListarCafesComponent>;
  let debug: DebugElement;
  let cafesService: jasmine.SpyObj<CafesService>;

  beforeEach(async(() => {
    cafesService = jasmine.createSpyObj('CafesService', ['getCafes']);
    cafesService.getCafes.and.returnValue(of(generarCafes(10)));
    TestBed.configureTestingModule({
      declarations: [ListarCafesComponent],
      imports: [HttpClientModule],
      providers: [{ provide: CafesService, useValue: cafesService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCafesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe tener h1 El aroma mágico ', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1.nativeElement.textContent).toContain('El aroma mágico');
  });
  it('Debe tener imagen con alt  ', () => {
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.getAttribute('src')).toBe('/assets/image_1.png');
    expect(img.nativeElement.getAttribute('alt')).toBe('Granos de café');
  });
  it('Debe tener la tabla con los campos esperdos', () => {
    expect(component.cafes.length).toBe(10);
    const tableRows = fixture.debugElement.queryAll(By.css('tr'));
    if (!tableRows || tableRows.length === 0) {
      fail('No hay filas');
    }
    const headerRow = tableRows.shift()?.nativeElement;
    expect(headerRow.cells[0].textContent).toBe('#');
    expect(headerRow.cells[1].textContent).toBe('Nombre');
    expect(headerRow.cells[2].textContent).toBe('Tipo');
    expect(headerRow.cells[3].textContent).toBe('Región');
    tableRows.forEach((row, index) => {
      const cells = row.nativeElement.cells;
      const cafe = component.cafes[index];
      expect(cells[0].textContent).toBe(cafe.id.toString());
      expect(cells[1].textContent).toBe(cafe.nombre);
      expect(cells[2].textContent).toBe(cafe.tipo);
      expect(cells[3].textContent).toBe(cafe.region);
    });
  });
  it('Debe mostrar el total de origen y blend', () => {
    fail('No implementado');
  });
  it('Debe tener el footer', () => {
    fail('No implementado');
  });
  it('Debe mostrar error', () => {
    fail('No implementado');
  });
});
