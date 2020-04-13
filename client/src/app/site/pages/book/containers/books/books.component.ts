import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppReducer from '../../../../../store/app.reducer';
import * as BookActions from '../../store/book.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  books;
  isLoading;
  private booksSub: Subscription;
  constructor(
    private store: Store<AppReducer.AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new BookActions.FetchBooksStart());
    this.booksSub = this.store.select('book').subscribe(book => {
      this.books = book.books;
      this.isLoading = book.isLoading;
    });
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
    this.store.dispatch(new BookActions.ClearBooks());
  }

}
