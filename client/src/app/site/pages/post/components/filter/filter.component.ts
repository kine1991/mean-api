import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppReducer from '../../../../../store/app.reducer';
import * as PostActions from '../../store/post.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filter = null;
  // filter = { 'topic': [ 'cars', 'news', 'sports' ], 'tags': [ 'tag1', 'tag2', 'tag3', 'tag4' ] };

  constructor(
    private store: Store<AppReducer.AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new PostActions.FetchPostFilterStart());

    this.store.select('post').subscribe(post => {
      this.filter = post.filter;

      // console.log('post.filter', post.filter);
    });
  }

  // foods = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];

}
