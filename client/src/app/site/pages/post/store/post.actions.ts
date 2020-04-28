import { Action } from '@ngrx/store';

import { ResponsePosts, ResponsePost } from '../models/post.models';

export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const FETCH_POST_BY_SLUG_START = 'FETCH_POST_BY_SLUG_START';
export const FETCH_POST_BY_SLUG_SUCCESS = 'FETCH_POST_BY_SLUG_SUCCESS';
export const FETCH_POST_BY_SLUG_FAILURE = 'FETCH_POST_BY_SLUG_FAILURE';

export const CLEAR_POST = 'CLEAR_POST';
export const CLEAR_POSTS = 'CLEAR_POSTS';

// FETCH POSTS
export class FetchPostsStart implements Action {
  readonly type = FETCH_POSTS_START;

  constructor(public params?: any) {}
}

export class FetchPostsSuccess implements Action {
  readonly type = FETCH_POSTS_SUCCESS;

  constructor(public payload: ResponsePosts) {}
}

export class FetchPostsFailure implements Action {
  readonly type = FETCH_POSTS_FAILURE;

  constructor(public payload: any) {}
}

// FETCH POST BY SLUG
export class FetchPostBySlugStart implements Action {
  readonly type = FETCH_POST_BY_SLUG_START;

  constructor(public slug: string) {}
}
export class FetchPostBySlugSuccess implements Action {
  readonly type = FETCH_POST_BY_SLUG_SUCCESS;

  constructor(public payload: ResponsePost) {}
}
export class FetchPostBySlugFailure implements Action {
  readonly type = FETCH_POST_BY_SLUG_FAILURE;

  constructor(public payload: string) {}
}

// CLEAR
export class ClearPost implements Action {
  readonly type = CLEAR_POST;
}

export class ClearPosts implements Action {
  readonly type = CLEAR_POSTS;
}


export type PostActions = FetchPostsStart |
                          FetchPostsSuccess |
                          FetchPostsFailure |
                          FetchPostBySlugStart |
                          FetchPostBySlugSuccess |
                          FetchPostBySlugFailure |
                          ClearPost |
                          ClearPosts;
