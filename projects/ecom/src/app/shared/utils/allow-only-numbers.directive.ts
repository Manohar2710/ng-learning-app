import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAllowOnlyNumbers]',
  standalone: true
})
export class AllowOnlyNumbersDirective {

  constructor() { }
@HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow navigation keys: Backspace, Tab, Enter, Arrows
    const allowedKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allowedKeys.includes(event.key)) return;

    // Prevent keypress if it's not a digit
    const isNumber = /[0-9]/.test(event.key);
    if (!isNumber) {
      event.preventDefault();
    }
  }
}
