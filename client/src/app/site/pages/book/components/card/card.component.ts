import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() book;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // console.log('book', this.book);
  }

  navigateTo(id) {
    this.router.navigate(['books', id]);
  }

}
