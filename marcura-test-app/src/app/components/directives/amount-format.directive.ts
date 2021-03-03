import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAmountFormat]'
})
export class AmountFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event): void {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^0-9.]*/g, '');

    if ( initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener('keypress', ['$event']) onKeypress(event): void {
    if ((this.el.nativeElement.value.indexOf('.') !== -1)
      && (this.el.nativeElement.value.substring(this.el.nativeElement.value.indexOf('.')).length > 2)
      && (this.el.nativeElement.selectionStart >= this.el.nativeElement.value.length - 2)
    ) {
      event.preventDefault();
    }
  }

  @HostListener('focusout') onFocusOut(): void {
    if (this.el.nativeElement.value === '') {
      this.el.nativeElement.value = 0;
    }

    this.el.nativeElement.value = parseFloat(this.el.nativeElement.value).toFixed(2);
  }
}
