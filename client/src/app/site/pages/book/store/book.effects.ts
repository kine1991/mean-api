import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as BookActions from './book.actions';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseBooks, ResponseBook, ResponseFilter } from '../models/book.model';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BookEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
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
        }),
        catchError(error => {
          console.log('errror', error);
          if (error.status === 404) {
            this.router.navigateByUrl('/books/page-not-found', {skipLocationChange: true});
          }
          return EMPTY;
        })
      );
    })
  );

  @Effect()
  fetchFilter = this.actions$.pipe(
    ofType(BookActions.FETCH_FILTER_START),
    switchMap(() => {
      return this.http.get<ResponseFilter>(`${environment.url}/api/v1/books/filter`).pipe(
        map(data => {
          console.log('filter', data);
          return new BookActions.FetchFilterSuccess(data);
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

