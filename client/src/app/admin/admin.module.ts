import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './containers/admin/admin.component';
import { MainComponent } from './pages/main/main.component';
import { AdminSideNavComponent } from './components/admin-side-nav/admin-side-nav.component';


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
    AdminRoutingModule
  ]
})
export class AdminModule { }
