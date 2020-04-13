import { Action } from '@ngrx/store';

import { ResponseBooks } from '../models/book.model';

export const FETCH_BOOKS_START = 'FETCH_BOOKS_START';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

export const FETCH_BOOK_START = 'FETCH_BOOK_START';
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
export const FETCH_BOOK_FAILURE = 'FETCH_BOOK_FAILURE';


export class FetchBooksStart implements Action {
  readonly type = FETCH_BOOKS_START;
}

export class FetchBooksSuccess implements Action {
  readonly type = FETCH_BOOKS_SUCCESS;

  constructor(public payload: ResponseBooks) {}
}

export class FetchBooksFailure implements Action {
  readonly type = FETCH_BOOKS_FAILURE;
}

export class FetchBookStart implements Action {
  readonly type = FETCH_BOOK_START;
}

export class FetchBookSuccess implements Action {
  readonly type = FETCH_BOOK_SUCCESS;
}

export class FetchBookFailure implements Action {
  readonly type = FETCH_BOOK_FAILURE;
}

export type BookActions = FetchBooksStart |
                          FetchBooksSuccess |
                          FetchBooksFailure |
                          FetchBooksStart |
                          FetchBooksSuccess |
                          FetchBooksFailure;
