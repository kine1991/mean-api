import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import * as BookActions from '../../store/book.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-selected-book',
  templateUrl: './selected-book.component.html',
  styleUrls: ['./selected-book.component.scss']
})
export class SelectedBookComponent implements OnInit, OnDestroy {
  book;
  isLoading;
  private bookSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(({ params }: Params) => {
      this.store.dispatch(new BookActions.FetchBookStart(params.slug));
    });

    this.bookSub = this.store.select('book').subscribe(book => {
      console.log('book', book.book);
      this.book = book.book;
      this.isLoading = book.isLoading;
    });
  }

  ngOnDestroy() {
    this.bookSub.unsubscribe();
    this.store.dispatch(new BookActions.ClearBook());
  }

  backToBooks() {
    this.router.navigate(['books']);
  }

}
