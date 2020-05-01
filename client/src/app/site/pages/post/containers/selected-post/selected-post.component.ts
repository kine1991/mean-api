import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as PostActions from '../../store/post.actions';
import * as fromApp from '../../../../../store/app.reducer';

@Component({
  selector: 'app-selected-post',
  templateUrl: './selected-post.component.html',
  styleUrls: ['./selected-post.component.scss']
})
export class SelectedPostComponent implements OnInit, OnDestroy {
  post;
  isLoading;
  postSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: Params) => {
      const slug = params.slug;
      this.store.dispatch(new PostActions.FetchPostBySlugStart(slug));
      // console.log('slug', slug);
    });

    this.postSub = this.store.select('post').subscribe(post => {
      console.log('post.post', post.post);
      this.post = post.post;
      this.isLoading = post.isLoading;
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.store.dispatch(new PostActions.ClearPost());
  }

  backToPosts() {
    console.log('backToPosts');
  }
}
