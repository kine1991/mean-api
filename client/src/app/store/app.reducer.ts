import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../site/pages/auth/store/auth.reducer';
import * as fromBook from '../site/pages/book/store/book.reducer';

export interface AppState {
  auth: fromAuth.State;
  book: fromBook.State;
}

export const appReducer = {
  auth: fromAuth.authReducer,
  book: fromBook.bookReducer,
};
