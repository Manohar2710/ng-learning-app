import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child-example',
  standalone: true,
  imports: [],
  templateUrl: './child-example.component.html',
  styleUrl: './child-example.component.scss'
})
export class ChildExampleComponent {
  @Input() data: any;

  @Output("onClickAction") 
  onClickEventEmitter = new EventEmitter<any>();

  items = [
    'one',
    "two",
    "three"
  ]
  onClick() {
    this.onClickEventEmitter.emit();
  }
}
