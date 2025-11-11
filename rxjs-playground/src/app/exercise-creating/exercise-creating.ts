import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Observer, Subscriber, OperatorFunction, pipe, take } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-creating.html',
  imports: [HistoryWindow]
})
export class ExerciseCreating {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    /**** HAUSAUFGABE */
    // Erstelle ein Observable, das die Elemente eines Arrays in einem Intervall ausgibt.
    // Eingabe: ['A', 'B', 'C', 'D']
    // Abstand: 1000 ms
    // Ergebnis: ---A---B---C---D|

    function delayedFromArray<T>(arr: T[], delayMs: number): Observable<T> {
      return interval(delayMs).pipe(
        take(arr.length),
        map(i => arr[i])
      );
    }

    const delayed$ = delayedFromArray(['A', 'B', 'C', 'D'], 1000);


    /******************************/

    /**** CREATION FUNCTIONS */

    // of('Stuttgart', 'Hamburg', 'München', 'Leipzig', 'Jena')
    // from([1,2,3,4,5])
    // interval(1000)        // ---0---1---2---3---4 ...
    // timer(3000)           // ---------0|
    // timer(3000, 1000)     // ---------0---1---2---3---4 ...
    // timer(0, 1000)        // 0---1---2---3---4 ...


    function toString(): OperatorFunction<number, string> {
      return (source$) => {
        return new Observable<string>(sub => {
          const subscription = source$.subscribe({
            next: e => sub.next('X ' + e.toString()),
            error: e => sub.error(e),
            complete: () => sub.complete()
          });

          // Teardown Logic
          return () => {
            subscription.unsubscribe();
          }
        })
      }
    }

    function toString2(): OperatorFunction<number, string> {
      return pipe(
        map(num => 'X ' + num.toString()),
        // filter()
      )
    }


    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0),
      toString()
    )/*.subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });*/


    /******************************/

    // Producer: generiert die Daten und ruft Callbacks auf
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(5);

      setTimeout(() => sub.next(100), 2000)
      setTimeout(() => sub.complete(), 4000)
    }

    // Observer: definiert die Callbacks und empfängt die Daten
    const obs: Observer<number> = {
      next: (e: number) => console.log(e),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    };

    // producer(obs);

    // Observable: Schnittstelle zwischen Producer und Observer
    // Finnische Notation $
    const myObs$ = new Observable(producer);

    // Susbcription: Vertrag zwischen Observer und Observable
    // myObs$.subscribe(obs);


    function generateStaticTextDelayed(text: string, timeoutMs: number) {
      return new Observable<string>(sub => {
        setTimeout(() => {
          sub.next(text);
        }, timeoutMs)
      });
    }

    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
