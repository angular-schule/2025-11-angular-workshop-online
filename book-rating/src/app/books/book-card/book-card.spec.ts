import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCard } from './book-card';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
import { Book } from '../shared/book';

describe('BookCard', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [BookCard]
    })
    .compileComponents();

    const testBook = signal<Book>({
      isbn: '123',
      title: 'Angular',
      description: '',
      rating: 3,
      price: 29
    });

    fixture = TestBed.createComponent(BookCard, {
      bindings: [
        inputBinding('book', testBook)
      ]
    });
    component = fixture.componentInstance;
    // Host-/DOM-Element
    // fixture.nativeElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
