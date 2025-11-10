import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookStore } from '../shared/book-store';
import { Router } from '@angular/router';

const isbnValidator = Validators.compose([
  Validators.required,
  Validators.minLength(13),
  Validators.maxLength(13),
  Validators.pattern(/^[0-9]*$/)
]);

@Component({
  selector: 'app-book-create-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss'
})
export class BookCreatePage {
  #store = inject(BookStore);
  #router = inject(Router);
  /*#fb = inject(NonNullableFormBuilder);

  bf2 = this.#fb.group({
    isbn: ['', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
      Validators.pattern(/^[0-9]*$/)]
    ]
  })*/

  protected readonly bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern(/^[0-9]*$/)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(80)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]
    }),
    authors: new FormArray([
      new FormControl('', { nonNullable: true }),
      new FormControl('', { nonNullable: true }),
      new FormControl('', { nonNullable: true }),
    ])
  });

  addAuthorControl() {
    this.bookForm.controls.authors.push(
      new FormControl('', { nonNullable: true })
    );
  }

  removeAuthorControl(index: number) {
    this.bookForm.controls.authors.removeAt(index);
  }

  isInvalid(control: FormControl): boolean | null {
    if (control.untouched) {
      return null;
    }
    return control.invalid;
  }

  hasError(control: FormControl, errorCode: string): boolean | null {
    if (control.untouched) {
      return null;
    }

    // return control.errors[errorCode];
    return control.hasError(errorCode);
  }

  submitForm() {
    const newBook: Book = {
      ...this.bookForm.getRawValue(),
      authors: this.bookForm.controls.authors.value.filter(a => a)
    };

    console.log(newBook);

    this.#store.create(newBook).subscribe(createdBook => {
      // SUCCESS!
      this.#router.navigate(['/books', 'details', createdBook]);
    });
  }
}

/*
TODO:
- Fehlermeldungen anzeigen ✅
  - "Die ISBN ist ungültig"
  - "Die ISBN ist zu kurz"
- Submit verhindern, wenn ungültig
- Formular abschicken
- zum Server schicken (POST)
- wegnavigieren zur Detailseite
- (ISBN auf Existenz prüfen)

- Autoren erfassen
  - Interface Book erweitern (authors)
  - FormArray
  - für jeden Autor ein Textfeld (@for über Controls aus dem FormArray)
  - Button für "Add Author"
  - (Button "Remove Author")
*/
