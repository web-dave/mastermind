import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

type IResult = '🤘' | '👍' | '👎';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'mastermind';
  tries: number[][] = [];
  results: IResult[][] = [];
  dialLists = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  ];

  code: number[] = [];

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
    this.tries = [];
    this.results = [];
    this.code = this.getCode();
  }

  check() {
    if (this.tries.length <= 6) {
      const myTry = [
        this.dialLists[0][1],
        this.dialLists[1][1],
        this.dialLists[2][1],
        this.dialLists[3][1],
      ];
      const myTryResult: IResult[] = ['👎', '👎', '👎', '👎'];
      const checkedNumbers: number[] = [];
      for (let i = 0; i <= 3; i++) {
        if (!checkedNumbers.includes(myTry[i])) {
          checkedNumbers.push(myTry[i]);
          if (this.code.indexOf(myTry[i]) !== -1) {
            if (this.code.indexOf(myTry[i]) === i) {
              console.log(i, myTry[i]);
              myTryResult[i] = '🤘';
            } else {
              myTryResult[i] = '👍';
            }
          }
        }
      }

      console.log(
        myTry,
        '=>',
        this.code,
        myTryResult.sort(),
        myTryResult.every((c) => c === '🤘')
      );

      this.results.push(myTryResult);
      this.tries.push(myTry);
    }
  }

  dialMove(i: number) {
    if (this.tries.length <= 6) {
      const list = this.dialLists[i];
      const first = list[0];
      list.shift();
      list.push(first);
    }
  }
}
