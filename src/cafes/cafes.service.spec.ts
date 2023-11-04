/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CafesService } from './cafes.service';

describe('Service: Cafes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CafesService]
    });
  });

  it('should ...', inject([CafesService], (service: CafesService) => {
    expect(service).toBeTruthy();
  }));
});
