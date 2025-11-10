import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
      validators: []
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: []
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: []
    }),
  });
}
