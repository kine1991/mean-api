import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../pages/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  userData = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuth$.subscribe(isAuth => {
      this.isAuth = isAuth;
    });

    this.authService.getMe().subscribe(userData => {
      this.userData = userData.data.user;
      console.log('userData', userData);
    });
  }

}
