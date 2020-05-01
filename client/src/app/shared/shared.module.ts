import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './modules/angular-material.module';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule
  ],
  exports: [
    PageNotFoundComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule
  ]
})
export class SharedModule { }
