import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDishFormComponent } from './add-edit-dish-form.component';

describe('AddEditDishFormComponent', () => {
  let component: AddEditDishFormComponent;
  let fixture: ComponentFixture<AddEditDishFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDishFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
