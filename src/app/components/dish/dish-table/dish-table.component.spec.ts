import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishTableComponent } from './dish-table.component';

describe('DishTableComponent', () => {
  let component: DishTableComponent;
  let fixture: ComponentFixture<DishTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
