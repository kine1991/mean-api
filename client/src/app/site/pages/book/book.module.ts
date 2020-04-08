import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BooksComponent } from './containers/books/books.component';
import { SelectedBookComponent } from './containers/selected-book/selected-book.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BooksComponent, SelectedBookComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule
  ]
})
export class BookModule { }
