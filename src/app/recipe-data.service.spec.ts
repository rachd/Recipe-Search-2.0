import { TestBed, inject } from '@angular/core/testing';

import { RecipeDataService } from './recipe-data.service';

describe('RecipeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeDataService]
    });
  });

  it('should ...', inject([RecipeDataService], (service: RecipeDataService) => {
    expect(service).toBeTruthy();
  }));
});