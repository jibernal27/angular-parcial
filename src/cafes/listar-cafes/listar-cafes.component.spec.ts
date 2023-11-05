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
    const validarTotales = (expectedBlend: number, totalOrigen: number) => {
      fixture.detectChanges();
      const divTipos = fixture.debugElement.query(By.css('.row.tipos-text'));
      const p = divTipos.queryAll(By.css('p'));
      expect(p.length).toBe(2);
      expect(expectedBlend + totalOrigen).toBe(component.cafes.length);
      const origen = p[0].nativeElement;
      const blend = p[1].nativeElement;
      expect(origen.textContent).toContain(
        `Total café de origen: ${totalOrigen}`
      );
      expect(blend.textContent).toContain(`Total café blend: ${expectedBlend}`);
    };

    // Resultados random
    const expectedOrigen: number = component.cafes.filter(
      (cafe) => cafe.tipo == 'Café de Origen'
    ).length;
    const expectedBlend: number = component.cafes.filter(
      (cafe) => cafe.tipo == 'Blend'
    ).length;
    validarTotales(expectedBlend, expectedOrigen);

    // Solo blend
    component.cafes = generarCafes(10).map((cafe) => {
      cafe.tipo = 'Blend';
      return cafe;
    });
    validarTotales(10, 0);

    // Solo origen
    component.cafes = generarCafes(10).map((cafe) => {
      cafe.tipo = 'Café de Origen';
      return cafe;
    });
    validarTotales(0, 10);
  });
  it('Debe tener el footer', () => {
    const footer = fixture.debugElement.query(By.css('.fixed-bottom'));
    expect(footer.nativeElement.textContent).toContain(
      'Contact us: +57 3102105253 - info@elaromamagico.com - @elaromamagico'
    );
  });
  it('Debe mostrar error cuando sea necesario', () => {
    component.huboError = true;
    fixture.detectChanges();
    const alert = fixture.debugElement.query(By.css('.alert-danger'));
    expect(alert.nativeElement.textContent).toContain(
      'Hubo un error al cargar los cafés. Por favor, intente nuevamente.'
    );
  });
});
