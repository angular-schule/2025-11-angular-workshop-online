import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingDisplay } from './rating-display';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';

describe('RatingDisplay', () => {
  let component: RatingDisplay;
  let fixture: ComponentFixture<RatingDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingDisplay],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    const ratingValue = signal(4);

    fixture = TestBed.createComponent(RatingDisplay, {
      bindings: [
        inputBinding('value', ratingValue),
        // inputBinding('value', () => 4)
      ]
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
