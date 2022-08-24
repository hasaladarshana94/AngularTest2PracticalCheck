import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSentimentInformationComponent } from './stock-sentiment-information.component';

describe('StockSentimentInformationComponent', () => {
  let component: StockSentimentInformationComponent;
  let fixture: ComponentFixture<StockSentimentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSentimentInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSentimentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
