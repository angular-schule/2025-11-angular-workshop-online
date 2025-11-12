import { Component, signal } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, of } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-gamescore.html',
  imports: [HistoryWindow]
})
export class ExerciseGamescore {

  logStream$ = new ReplaySubject<unknown>();
  readonly score$ = new Subject<number>();

  readonly currentScore = signal(0);
  readonly finalScore = signal<number | undefined>(undefined);

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den Punktestand zu ermitteln ...
     */

    /******************************/

    this.score$.pipe(
      scan((score, points) => score + points, 0)
    ).subscribe(cs => {
      this.currentScore.set(cs);
    });

    this.score$.pipe(
      reduce((score, points) => score + points, 0)
    ).subscribe(fs => {
      this.finalScore.set(fs);
    });

    /******************************/

    // Ausblick: Idee von Redux / NgRx
    of(
      /*{ name: 'Klaus' },
      { name: 'Sabine' },
      { city: 'Leipzig', lang: 'DE' },
      { lang: 'EN', city: 'London' },
      { name: 'Anouk' }*/
       'SETNAMEKLAUS',
       'SETNAMESABINE',
       'SETCITYLEIPZIG',
       'SETCITYLONDON',
       'SETNAMEANOUK'
    ).pipe(
      scan((acc, item) => {
        switch (item) {
          case 'SETNAMEKLAUS': return { ...acc, name: 'Klaus' };
          case 'SETNAMESABINE': return { ...acc, name: 'Sabine' };
          case 'SETNAMELISA': return { ...acc, name: 'Lisa' };
          case 'SETCITYLEIPZIG': return { ...acc, city: 'Leipzig', lang: 'DE' };
          case 'SETCITYLONDON': return { ...acc, city: 'London', lang: 'EN' };
          default: return acc;
        }
      }, { city: 'München', name: 'Ferdinand' })
    ).subscribe(e => {
      console.log(e);
    })


    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
