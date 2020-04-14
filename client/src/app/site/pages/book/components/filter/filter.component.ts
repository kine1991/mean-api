import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as AppReducer from '../../../../../store/app.reducer';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filter;
  appliedGenres = [];
  appliedAuthors = [];

  constructor(
    private router: Router,
    private store: Store<AppReducer.AppState>
  ) { }

  ngOnInit() {
    // console.log('filter', this.filter);

    // this.store.select('book').subscribe(book => {
    //   if (book.filter) {
    //     console.log('book', book.filter);

    //   }
    // });
  }

  apply() {
    // console.log(this.appliedGenres);
    // console.log(this.appliedAuthors);
    const navigationExtras: NavigationExtras = {
      queryParams: { genre: this.appliedGenres, author: this.appliedAuthors },
    };

    this.router.navigate(['/books'], navigationExtras);
  }

  // onChange(genre, $event.target.checked) {

  onChange(item, type, $event) {
    if (type === 'genre') {
      if ($event.checked) {
        // push
        if (!this.appliedGenres.includes(item)) {
          this.appliedGenres.push(item);
        }
      } else {
        // remove
        this.appliedGenres = this.appliedGenres.filter(appliedGenre => appliedGenre !== item);
      }
    } else if (type === 'author') {
      if ($event.checked) {
        // push
        if (!this.appliedAuthors.includes(item)) {
          this.appliedAuthors.push(item);
        }
      } else {
        // remove
        this.appliedAuthors = this.appliedAuthors.filter(appliedGenre => appliedGenre !== item);
      }
    }
    // console.log(item, $event.checked, type);

  }

}
