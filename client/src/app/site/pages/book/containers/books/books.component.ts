import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppReducer from '../../../../../store/app.reducer';
import * as BookActions from '../../store/book.actions';
import { Subscription } from 'rxjs';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  books;
  isLoading;
  filter;
  allBooksCount = 1;
  params;

  limit = 20;
  page = 1;
  allPages = 1;
  private booksSub: Subscription;

  constructor(
    private store: Store<AppReducer.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.store.dispatch(new BookActions.FetchBooksStart());
    // this.store.dispatch(new BookActions.FetchBooksCountStart());
    this.store.dispatch(new BookActions.FetchFilterStart());

    this.booksSub = this.store.select('book').subscribe(book => {
      this.books = book.books;
      this.isLoading = book.isLoading;
      this.filter = book.filter;
      this.allBooksCount = book.allBooksCount;
      this.allPages = Math.ceil(book.allBooksCount / this.limit);
    });

    this.route.queryParams.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe((params: Params) => {
      this.store.dispatch(new BookActions.FetchBooksStart(params));
      this.store.dispatch(new BookActions.FetchBooksCountStart(params));
      console.log('params', params);
      if (params.page === undefined) {
        this.page = 1;
      } else {
        this.page = params.page;
      }
      // this.params = params;
    });
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
    this.store.dispatch(new BookActions.ClearBooks());
  }

  prev() {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: { page: [+this.page - 1] },
    };
    this.router.navigate(['books'], navigationExtras);
  }

  next() {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: { page: [+this.page + 1] },
    };
    this.router.navigate(['books'], navigationExtras);
  }

}
