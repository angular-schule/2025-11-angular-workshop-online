import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreateSignalPage } from './book-create-signal-page';

describe('BookCreateSignalPage', () => {
  let component: BookCreateSignalPage;
  let fixture: ComponentFixture<BookCreateSignalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCreateSignalPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCreateSignalPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
