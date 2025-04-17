import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIngredientComponent } from './list-ingredient.component';

describe('ListIngredientComponent', () => {
  let component: ListIngredientComponent;
  let fixture: ComponentFixture<ListIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListIngredientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
