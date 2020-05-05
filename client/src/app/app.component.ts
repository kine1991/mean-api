import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// import * as AppReducer from '../../store/app.reducer';
import * as AppReducer from './store/app.reducer';
import * as AuthActions from './site/pages/auth/store/auth.actions';
// import * as AuthActions from './pages/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  currentUser;
  isLoading;

  constructor (
    private store: Store<AppReducer.AppState>
  ) {}

  ngOnInit () {
    this.store.dispatch(new AuthActions.AutoLoginStart());
  
    this.store.select('auth').subscribe(auth => {
      this.currentUser = auth.currentUser;
      this.isLoading = auth.isLoading;
      // console.log('auth', auth);
    });

  }

}
