import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard-page';
import { provideZonelessChangeDetection } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingHelper } from '../shared/book-rating-helper';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async () => {

    const ratingHelperMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        provideZonelessChangeDetection(),
        // RatingHelper ersetzen:
        // Immer wenn jemand BRH anfordert, wird stattdessen
        // unser ratingHelperMock ausgeliefert
        { provide: BookRatingHelper, useValue: ratingHelperMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component.doRateUp() calls helper.rateUp()', () => {
    // Arrange
    // BRH anfordern, das ist eigentlich unser Mock!
    const helper = TestBed.inject(BookRatingHelper);

     // Testbuch
    const testBook = { isbn: '123' } as Book; // Type Assertion, bitte vorsichtig verwenden!


    // Objekt überwachen
    // spyOn(helper, 'rateUp').and.callFake(b => b);
    // spyOn(helper, 'rateUp').and.returnValue(testBook);
    spyOn(helper, 'rateUp').and.callThrough();


    // Act
    component.doRateUp(testBook);

    // Assert
    // prüfen, ob helper.rateUp() mit Argument testBook aufgerufen wurde
    expect(helper.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
