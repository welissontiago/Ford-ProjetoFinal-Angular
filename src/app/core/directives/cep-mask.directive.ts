import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCepMask]',
  standalone: true,
})
export class CepMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 8) {
      value = value.substring(0, 8);
    }
    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }

    input.value = value;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    )?.set;
    nativeInputValueSetter?.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
