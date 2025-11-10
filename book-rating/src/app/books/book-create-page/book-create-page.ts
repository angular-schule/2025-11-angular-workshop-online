import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-create-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss'
})
export class BookCreatePage {
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
  });

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
}

/*
TODO:
- Fehlermeldungen anzeigen
  - "Die ISBN ist ungültig"
  - "Die ISBN ist zu kurz"
- Submit verhindern, wenn ungültig
- Autoren erfassen
- Formular abschicken
  - zum Server schicken (POST)
  - wegnavigieren zur Detailseite
- (ISBN auf Existenz prüfen)
*/
