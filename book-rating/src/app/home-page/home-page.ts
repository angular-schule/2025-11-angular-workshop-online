import { DatePipe } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [DatePipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage implements OnDestroy {

  protected readonly d = signal(Date.now());
  #interval = setInterval(() => {
    this.d.set(Date.now());
    console.log(this.d())
  }, 1000);

  ngOnDestroy() {
    clearInterval(this.#interval)
  }
}
