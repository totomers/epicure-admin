import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefTableComponent } from './chef-table.component';

describe('ChefTableComponent', () => {
  let component: ChefTableComponent;
  let fixture: ComponentFixture<ChefTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
