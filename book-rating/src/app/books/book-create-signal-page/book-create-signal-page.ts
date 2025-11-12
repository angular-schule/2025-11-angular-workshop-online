import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { apply, applyEach, Field, form, maxLength, minLength, readonly, required, schema, validate } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

export const isbnSchema = schema<string>(fieldPath => {
  required(fieldPath, { message: 'ISBN muss angegeben werden' });
  minLength(fieldPath, 13, { message: 'ISBN ist zu kurz' });
  maxLength(fieldPath, 13, { message: 'ISBN ist zu lang' });
  validate(fieldPath, ctx => {
    if (!ctx.value().startsWith('978')) {
      return {
        message: 'ISBN muss mit 978 beginnen',
        kind: 'startswith978'
      }
    }
    return undefined;
  });
})

export const bookFormSchema = schema<Book>(fieldPath => {
  apply(fieldPath.isbn, isbnSchema);

  applyEach(fieldPath.authors, (authorPath) => {
    maxLength(authorPath, 10)
  });

  readonly(fieldPath.title, ctx => {
    return !ctx.valueOf(fieldPath.isbn)
  });
});



@Component({
  selector: 'app-book-create-signal-page',
  imports: [Field, JsonPipe],
  templateUrl: './book-create-signal-page.html',
  styleUrl: './book-create-signal-page.scss',
})
export class BookCreateSignalPage {
  protected readonly bookFormData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    rating: 1,
    price: 0,
    authors: ['', '', '']
  });

  protected readonly bookForm = form(this.bookFormData, bookFormSchema);

  submitForm() {
    console.log(this.bookFormData());
    return false;
  }

  addAuthorField() {
    this.bookForm.authors().value.update(authors => [...authors, '']);
    /*this.bookFormData.update(data => ({
      ...data,
      authors: [...data.authors, '']
    }))*/
  }
}
