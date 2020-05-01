import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-card-toggler',
  templateUrl: './card-toggler.component.html',
  styleUrls: ['./card-toggler.component.scss']
})
export class CardTogglerComponent implements OnInit {
  @Input() cardToggler;
  @Output() changeCardToggler = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onValChange(event) {
    this.changeCardToggler.emit(event.value);
  }

}
