import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating-display',
  imports: [],
  templateUrl: './rating-display.html',
  styleUrl: './rating-display.scss'
})
export class RatingDisplay {
  readonly value = input.required<number>();
  protected readonly starsArray = computed(() => new Array(Math.max(this.value(), 1)));
}
