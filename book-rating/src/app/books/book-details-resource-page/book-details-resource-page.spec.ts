import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsResourcePage } from './book-details-resource-page';

describe('BookDetailsResourcePage', () => {
  let component: BookDetailsResourcePage;
  let fixture: ComponentFixture<BookDetailsResourcePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetailsResourcePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookDetailsResourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
