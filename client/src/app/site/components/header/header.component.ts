import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../pages/auth/service/auth.service';
import { Store } from '@ngrx/store';

import * as AppReducer from '../../../store/app.reducer';
import * as AuthActions from '../../pages/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  userData = null;
  currentUser;
  isLoading: boolean;

  constructor(
    // private authService: AuthService,
    private store: Store<AppReducer.AppState>
  ) { }

  ngOnInit() {
    // this.authService.isAuth$.subscribe(isAuth => {
    //   console.log('isAuth', isAuth);
    //   this.isAuth = isAuth;
    // });

    // this.authService.getMe().subscribe(userData => {
    //   this.userData = userData.data.user;
    //   console.log('userData', userData);
    // });

    this.store.dispatch(new AuthActions.AutoLoginStart());

    this.store.select('auth').subscribe(auth => {
      this.currentUser = auth.currentUser;
      this.isLoading = auth.isLoading;
      // console.log('auth', auth);
    });
  }

  logout() {
    console.log('logout333');
    this.store.dispatch(new AuthActions.Logout());
    // this.authService.logout().subscribe(() => {});
  }
}
