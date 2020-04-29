import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, NavigationExtras, Params } from '@angular/router';

import * as AppReducer from '../../../../../store/app.reducer';
import * as PostActions from '../../store/post.actions';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts;
  params;
  cardToggler: string;
  postSub: Subscription;

  // pagination
  allPostsCount = 1;
  limit = 3;
  page = 1;
  allPages = 1;

  constructor(
    private store: Store<AppReducer.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cardToggler = 'list';
    // this.store.dispatch(new PostActions.FetchPostsStart());
    this.postSub = this.store.select('post').subscribe(post => {
      this.posts = post.posts;
      this.allPostsCount = post.allPostsCount;
      this.allPages = Math.ceil(post.allPostsCount / this.limit);
    });

    this.route.queryParams.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ).subscribe((params: Params) => {
      console.log('params', params);
      this.store.dispatch(new PostActions.FetchPostsStart(params));
      if (params.page === undefined) {
        this.page = 1;
      } else {
        this.page = params.page;
      }
      this.params = params;
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

  prev() {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: { page: +this.page - 1 },
    };
    this.router.navigate(['posts'], navigationExtras);
  }

  next() {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: { page: +this.page + 1 },
    };
    this.router.navigate(['posts'], navigationExtras);
  }

}
