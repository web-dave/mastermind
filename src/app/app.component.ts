import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

type IResult = '🤘' | '👍' | '👎';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {
  maxAttempts = 9;
  title = 'mastermind';
  attempts: number[][] = [];
  results: IResult[][] = [];
  solved = false;
  dialLists = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  ];

  code: number[] = [];

  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe((data) => {
      location.reload();
    });
  }

  getCode(length = 4) {
    const availableNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let counter = 9;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      const index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let digit = availableNumbers[counter];
      availableNumbers[counter] = availableNumbers[index];
      availableNumbers[index] = digit;
    }
    const start = Math.floor(Math.random() * 6);
    return availableNumbers.slice(start, start + length);
  }

  ngOnInit() {
    this.attempts = [];
    this.results = [];
    this.dialLists = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    ];
    this.code = this.getCode();
    this.solved = false;
  }

  check() {
    if (this.attempts.length <= this.maxAttempts - 1) {
      this.solved = false;
      const attempt = [
        this.dialLists[0][1],
        this.dialLists[1][1],
        this.dialLists[2][1],
        this.dialLists[3][1],
      ];
      const attemptHint: IResult[] = [];
      for (let i = 0; i <= 3; i++) {
        if (this.code[i] === attempt[i]) {
          attemptHint.push('🤘');
        } else if (attempt.indexOf(this.code[i]) !== -1) {
          attemptHint.push('👍');
        }
      }

      console.log(
        attempt,
        '=>',
        this.code,
        attemptHint.sort(),
        attemptHint.every((c) => c === '🤘') &&
          attemptHint.length === 4,
      );
      this.solved =
        attemptHint.every((c) => c === '🤘') &&
        attemptHint.length === 4;
      this.results.push(attemptHint);
      this.attempts.push(attempt);
    }
  }

  dialMove(i: number) {
    if (this.attempts.length <= this.maxAttempts) {
      const list = this.dialLists[i];
      const first = list[0];
      list.shift();
      list.push(first);
    }
  }
}
