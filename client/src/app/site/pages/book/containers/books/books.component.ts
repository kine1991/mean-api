import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppReducer from '../../../../../store/app.reducer';
import * as BookActions from '../../store/book.actions';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books;
  constructor(
    private store: Store<AppReducer.AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new BookActions.FetchBooksStart());
    this.store.select('book').subscribe(book => {
      this.books = book.books;
    });
  }

}
