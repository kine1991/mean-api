import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../site/pages/auth/store/auth.reducer';

export interface AppState {
  auth: fromAuth.State;
}

export const appReducer = {
  auth: fromAuth.authReducer
};
