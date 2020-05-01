import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../site/pages/auth/store/auth.reducer';
import * as fromBook from '../site/pages/book/store/book.reducer';
import * as fromPost from '../site/pages/post/store/post.reducer';

export interface AppState {
  auth: fromAuth.State;
  book: fromBook.State;
  post: fromPost.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  book: fromBook.bookReducer,
  post: fromPost.postReducer
};
