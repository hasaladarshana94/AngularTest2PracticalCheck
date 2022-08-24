import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTrackComponent } from './stock-track.component';

describe('StockTrackComponent', () => {
  let component: StockTrackComponent;
  let fixture: ComponentFixture<StockTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
