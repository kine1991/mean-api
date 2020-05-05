import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './containers/admin/admin.component';
import { MainComponent } from './pages/main/main.component';
import { AdminSideNavComponent } from './components/admin-side-nav/admin-side-nav.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '../shared/interceptors/auth-http-interceptor';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    MainComponent,
    AdminSideNavComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
})
export class AdminModule { }
