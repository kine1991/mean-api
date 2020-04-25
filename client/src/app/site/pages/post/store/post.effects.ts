import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';

import * as PostActions from './post.actions';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ResponsePosts, ResponsePost } from '../models/post.models';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}

  @Effect()
  fetchPosts = this.actions$.pipe(
    ofType(PostActions.FETCH_POSTS_START),
    // switchMap((s : PostActions.FetchPostsStart) => {
    switchMap(() => {
      return this.http.get<ResponsePosts>(`${environment.url}/api/v1/posts`, {
        params: {}
      }).pipe(
        map(data => {
          // console.log('data', data);
          return new PostActions.FetchPostsSuccess(data);
        })
      );
    })
  );

  @Effect()
  fetchPostBySlug = this.actions$.pipe(
    ofType(PostActions.FETCH_POST_BY_SLUG_START),
    switchMap(({ slug }: PostActions.FetchPostBySlugStart) => {
      console.log('slug2', slug);
      return this.http.get<ResponsePost>(`${environment.url}/api/v1/posts/${slug}`).pipe(
        map(data => {
          // console.log('data', data);
          return new PostActions.FetchPostBySlugSuccess(data);
        })
      );
    })
  );
}
