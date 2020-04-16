import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private store: Store<AppReducer.AppState>
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      Object.keys(params).map(key => {
        if (key === 'genre') {
          this.appliedGenres = params[key];
        } else if (key === 'author') {
          this.appliedAuthors = params[key];
        }
      });
    });
  }


  apply() {
    // console.log(this.appliedGenres);
    // console.log(this.appliedAuthors);
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: {
        genre: this.appliedGenres.length !== 0 ? this.appliedGenres : null,
        author: this.appliedAuthors.length !== 0 ? this.appliedAuthors : null,
        page: undefined
      },
    };

    this.router.navigate(['/books'], navigationExtras);
  }

  onChange(item, type, $event) {
    if (type === 'genre') {
      if ($event.checked) {
        // add to list
        if (!this.appliedGenres.includes(item)) {
          this.appliedGenres = [...this.appliedGenres, item];
        }
      } else {
        // remove from list
        this.appliedGenres = this.appliedGenres.filter(appliedGenre => appliedGenre !== item);
      }
    } else if (type === 'author') {
      if ($event.checked) {
        // push
        if (!this.appliedAuthors.includes(item)) {
          this.appliedAuthors = [...this.appliedAuthors, item];
        }
      } else {
        // remove
        this.appliedAuthors = this.appliedAuthors.filter(appliedGenre => appliedGenre !== item);
      }
    }
    // console.log(item, $event.checked, type);

  }

  isCheck(item, type) {
    // console.log(this.appliedAuthors);
    // console.log(this.appliedGenres);
    let isChecked;
    if (type === 'genre') {
      isChecked = this.appliedGenres.includes(item);
    } else if (type === 'author') {
      isChecked = this.appliedAuthors.includes(item);
    }
    return isChecked;
  }

}
