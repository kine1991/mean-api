import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as BookActions from './book.actions';
import { switchMap, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseBooks, ResponseBook } from '../models/book.model';

@Injectable()
export class BookEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}

  @Effect()
  fetchBooks = this.actions$.pipe(
    ofType(BookActions.FETCH_BOOKS_START),
    switchMap(() => {
      return this.http.get<ResponseBooks>(`${environment.url}/api/v1/books`).pipe(
        map(data => {
          return new BookActions.FetchBooksSuccess(data);
        })
      );

    })
  );

  @Effect()
  fetchBook = this.actions$.pipe(
    ofType(BookActions.FETCH_BOOK_START),
    switchMap(({ payload }: BookActions.FetchBookStart) => {
      return this.http.get<ResponseBook>(`${environment.url}/api/v1/books/${payload}`).pipe(
        map(data => {
          return new BookActions.FetchBookSuccess(data);
        })
      );
    })
  );

  // @Effect({ dispatch: false })
  // clearBooks = this.actions$.pipe(
  //   tap(() => {

  //   })
  // );
}

