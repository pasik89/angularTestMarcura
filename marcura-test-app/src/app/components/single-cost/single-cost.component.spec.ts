import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCostComponent } from './single-cost.component';

describe('SingleCostComponent', () => {
  let component: SingleCostComponent;
  let fixture: ComponentFixture<SingleCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
