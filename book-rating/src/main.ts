import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));


///////////

export class Customer {

  // Propertys
  readonly #id: number = 5;

  constructor() {
    console.log('Hallo Klasse!');
  }

  // Methoden
  foobar(arg: number): string {
    this.#id = 6;
    setTimeout(() => {
      console.log('Die ID ist:', this.#id);
    }, 2000)
    return '';
  }
}

const myCustomer = new Customer();


/*const xyz = function (arg) {
  return arg + 1;
}*/

// ['Ferdinand', 'Michael', 'Patri(c)k'].find(name => name.startsWith('M'))
// ['Ferdinand', 'Michael', 'Patri(c)k'].find(function (name) { return name.startsWith('M') })

// Callback
// setTimeout(() => {}, 2000)

/*const xyz1 = arg => arg + 1;
const xyz1 = (arg: number) => arg + 1;
const xyz1 = (arg: number, arg2: number): string => arg + 1;
const xyz1 = arg => {
  return arg + 1
};


const result = xyz(4)
*/






