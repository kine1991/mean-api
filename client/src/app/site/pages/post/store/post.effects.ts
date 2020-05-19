import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as PostActions from './post.actions';
import { switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { ResponsePosts, ResponsePost, ResponsePostFilter, ResponseReviews, ResponseCreateReview } from '../models/post.models';

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
    switchMap((params: HttpParams) => {
      // console.log('params2', params);
      return this.http.get<ResponsePosts>(`${environment.url}/api/v1/posts`, {...params}).pipe(
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
      // console.log('slug2', slug);
      return this.http.get<ResponsePost>(`${environment.url}/api/v1/posts/${slug}`).pipe(
        map(data => {
          // console.log('data', data);
          return new PostActions.FetchPostBySlugSuccess(data);
        })
      );
    })
  );

  @Effect()
  fetchPostFilter = this.actions$.pipe(
    ofType(PostActions.FETCH_POST_FILTER_START),
    switchMap(() => {
      return this.http.get<ResponsePostFilter>(`${environment.url}/api/v1/posts/getFilter`).pipe(
        map(data => {
          return new PostActions.FetchPostFilterSuccess(data);
        })
      );
    })
  );

  @Effect()
  fetchCommentByPost = this.actions$.pipe(
    ofType(PostActions.FETCH_COMMENTS_BY_POST_START),
    switchMap(({ postId }: PostActions.FetchCommentsByPostStart) => {
      // console.log('po', postId)
      return this.http.get<ResponseReviews>(`${environment.url}/api/v1/reviews-post/${postId}`).pipe(
        map(data => {
          return new PostActions.FetchCommentsByPostSuccess(data);
        })
      );
    })
  );

  @Effect()
  createComment = this.actions$.pipe(
    ofType(PostActions.CREATE_COMMENT_START),
    switchMap(({ postId, comment } : PostActions.CreateCommentStart) => {
      console.log('postId', postId);
      return this.http.post<ResponseCreateReview>(`${environment.url}/api/v1/reviews-post/${postId}/create`, {
        review: comment
      }).pipe(
        map(data => {
          return new PostActions.CreateCommentSuccess(data);
          // return new PostActions.FetchCommentsByPostSuccess(data);
        })
      );
    })
  );
}
