import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BooksComponent } from './containers/books/books.component';
import { SelectedBookComponent } from './containers/selected-book/selected-book.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { SimpleCardComponent } from './components/simple-card/simple-card.component';


@NgModule({
  declarations: [BooksComponent, SelectedBookComponent, CardComponent, SimpleCardComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule
  ]
})
export class BookModule { }
