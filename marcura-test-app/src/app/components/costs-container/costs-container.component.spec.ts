import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsContainerComponent } from './costs-container.component';

describe('CostsContainerComponent', () => {
  let component: CostsContainerComponent;
  let fixture: ComponentFixture<CostsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
