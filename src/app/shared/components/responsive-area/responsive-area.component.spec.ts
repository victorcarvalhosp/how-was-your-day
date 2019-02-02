import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveAreaComponent } from './responsive-area.component';

describe('ResponsiveAreaComponent', () => {
  let component: ResponsiveAreaComponent;
  let fixture: ComponentFixture<ResponsiveAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsiveAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiveAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
