import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppReducer from '../../../../../store/app.reducer';
import * as PostActions from '../../store/post.actions';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filter = null;
  selectedTopic;
  selectedTags;
  // filter = { 'topic': [ 'cars', 'news', 'sports' ], 'tags': [ 'tag1', 'tag2', 'tag3', 'tag4' ] };

  constructor(
    private store: Store<AppReducer.AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.dispatch(new PostActions.FetchPostFilterStart());

    this.store.select('post').subscribe(post => {
      this.filter = post.filter;

      // console.log('post.filter', post.filter);
    });
  }

  selectTopic(topic) {
    this.selectedTopic = topic;
    // console.log('topic', topic);
  }

  selectTags(tags) {
    this.selectedTags = tags;
    // console.log('tags', tags);
  }

  apply() {
    // console.log('selectedTopic', this.selectedTopic);
    // console.log('selectedTags', this.selectedTags);

    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: {
        topic: this.selectedTopic,
        tag: this.selectedTags,
        page: undefined
      }
    };
    this.router.navigate(['posts'], navigationExtras);
    // this.router.navigate(['posts'], { queryParams: { param1: ['aaa', 'ccc'] }});
  }

  clear() {
    this.router.navigate(['posts']);
    // console.log('clear');
  }

  // foods = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];

}
