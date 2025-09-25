import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = this.formatPhoneNumber(initialValue);
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  private formatPhoneNumber(value: string): string {
    if (!value) {
      return '';
    }
    value = value.replace(/\D/g, '');

    if (value.length > 10) {
      return `(${value.substring(0, 2)}) ${value.substring(
        2,
        7
      )}-${value.substring(7, 11)}`;
    } else if (value.length > 6) {
      return `(${value.substring(0, 2)}) ${value.substring(
        2,
        6
      )}-${value.substring(6, 10)}`;
    } else if (value.length > 2) {
      return `(${value.substring(0, 2)}) ${value.substring(2)}`;
    } else {
      return `(${value}`;
    }
  }
}
