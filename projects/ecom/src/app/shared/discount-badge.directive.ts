import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';

@Directive({
  selector: '[appDiscountBadge]',
  standalone: true
})
export class DiscountBadgeDirective implements OnInit {

  @Input() discount!: number | undefined;

  @HostBinding("class.high-discount") highDiscount = false;
  @HostBinding("class.medium-discount") mediumDiscount = false;
  @HostBinding("style.backgroundColor") bgcolor = '';
  constructor() { }
  ngOnInit(): void {
    if(this.discount ?? 0 >= 50 ){
      this.highDiscount = true;
    } else if(this.discount ?? 0 < 50) {
      this.mediumDiscount = true;
    }
    this.bgcolor = this.highDiscount ? 'red' : this.mediumDiscount ? 'orange' : 'green'; 
  }


}
