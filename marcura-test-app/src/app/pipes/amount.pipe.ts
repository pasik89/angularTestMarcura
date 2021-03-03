import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})

export class AmountPipe implements PipeTransform {
  transform(value: any): any {
    const amountToFormat = parseFloat(value)
      .toFixed(2)
      .split('.');
    const formattedDigits = amountToFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return [formattedDigits, amountToFormat[1]].join('.');
  }

}
