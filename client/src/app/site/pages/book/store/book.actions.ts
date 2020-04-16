import { Action } from '@ngrx/store';

import { ResponseBooks, ResponseBook, ResponseFilter, ResponseBooksCount } from '../models/book.model';

export const FETCH_BOOKS_START = 'FETCH_BOOKS_START';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

export const FETCH_BOOK_START = 'FETCH_BOOK_START';
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
export const FETCH_BOOK_FAILURE = 'FETCH_BOOK_FAILURE';

export const FETCH_BOOKS_COUNT_START = 'FETCH_BOOKS_COUNT_START';
export const FETCH_BOOKS_COUNT_SUCCESS = 'FETCH_BOOKS_COUNT_SUCCESS';
export const FETCH_BOOKS_COUNT_FAILURE = 'FETCH_BOOKS_COUNT_FAILURE';

export const CLEAR_BOOKS = 'CLEAR_BOOKS';
export const CLEAR_BOOK = 'CLEAR_BOOK';

export const FETCH_FILTER_START = 'FETCH_FILTER_START';
export const FETCH_FILTER_SUCCESS = 'FETCH_FILTER_SUCCESS';
export const FETCH_FILTER_FAILURE = 'FETCH_FILTER_FAILURE';

// FETCH BOOKS
export class FetchBooksStart implements Action {
  readonly type = FETCH_BOOKS_START;

  constructor(public params?: any) {}
}

export class FetchBooksSuccess implements Action {
  readonly type = FETCH_BOOKS_SUCCESS;

  constructor(public payload: ResponseBooks) {}
}

export class FetchBooksFailure implements Action {
  readonly type = FETCH_BOOKS_FAILURE;
}

// FETCH BOOK
export class FetchBookStart implements Action {
  readonly type = FETCH_BOOK_START;

  constructor(public payload: string) {}
}

export class FetchBookSuccess implements Action {
  readonly type = FETCH_BOOK_SUCCESS;

  constructor(public payload: ResponseBook) {}
}

export class FetchBookFailure implements Action {
  readonly type = FETCH_BOOK_FAILURE;
}
// FETCH ALL BOOKS COUNT
export class FetchBooksCountStart implements Action {
  readonly type = FETCH_BOOKS_COUNT_START;

  constructor(public params?: any) {}
}

export class FetchBooksCountSuccess implements Action {
  readonly type = FETCH_BOOKS_COUNT_SUCCESS;

  constructor(public payload: ResponseBooksCount) {}
}

export class FetchBooksCountFailure implements Action {
  readonly type = FETCH_BOOKS_COUNT_FAILURE;
}

export class ClearBook implements Action {
  readonly type = CLEAR_BOOK;
}

export class ClearBooks implements Action {
  readonly type = CLEAR_BOOKS;
}

// FETCH FILTER
export class FetchFilterStart implements Action {
  readonly type = FETCH_FILTER_START;
}

export class FetchFilterSuccess implements Action {
  readonly type = FETCH_FILTER_SUCCESS;

  constructor(public payload: ResponseFilter) {}
}

export type BookActions = FetchBooksStart |
                          FetchBooksSuccess |
                          FetchBooksFailure |
                          FetchBookStart |
                          FetchBookSuccess |
                          FetchBookFailure |
                          ClearBooks |
                          ClearBook |
                          FetchFilterStart |
                          FetchFilterSuccess |
                          FetchBooksCountStart |
                          FetchBooksCountSuccess |
                          FetchBooksCountFailure;
