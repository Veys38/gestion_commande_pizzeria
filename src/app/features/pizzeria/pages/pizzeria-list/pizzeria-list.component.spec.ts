import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzeriaListComponent } from './pizzeria-list.component';

describe('PizzeriaListComponent', () => {
  let component: PizzeriaListComponent;
  let fixture: ComponentFixture<PizzeriaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzeriaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzeriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
