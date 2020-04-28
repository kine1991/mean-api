import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import * as AppReducer from '../../../../../store/app.reducer';
import * as PostActions from '../../store/post.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts;
  cardToggler: string;

  postSub: Subscription;

  constructor(
    private store: Store<AppReducer.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cardToggler = 'list';
    this.store.dispatch(new PostActions.FetchPostsStart());
    this.postSub = this.store.select('post').subscribe(post => {
      this.posts = post.posts;
      // console.log(post);
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.store.dispatch(new PostActions.ClearPosts());
  }

  changeCardToggler(cardToggler) {
    this.cardToggler = cardToggler;
    // console.log('cardToggler', cardToggler);
  }

}
