import {Component} from '@angular/core';
import {firstNames, prefixes, secondNames, suffix} from '@applications/random-name-generator/constants';

@Component({
  selector: 'app-random-name-generator',
  template: `
    <div class="random-name-generator">
      <h1>{{randomName || 'Click to generate'}}</h1>
      <button (click)="generateRandom()">GIMME A NAME</button>
    </div>
  `
})

export class RandomNameGeneratorComponent {
  randomName = '';

  public generateRandom() {
    // tslint:disable-next-line:max-line-length
    this.randomName = `${ this.getRandomFrom(prefixes) } ${ this.getRandomFrom(firstNames) } ${ this.getRandomFrom(secondNames) }, ${ this.getRandomFrom(suffix) }`;
  }

  private getRandomFrom(array: string[]): string {
    return array[Math.floor(Math.random() * (array.length - 1))];
  }
}
