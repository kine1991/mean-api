import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './container/site/site.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [SiteComponent, HeaderComponent, HomeComponent, SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }
