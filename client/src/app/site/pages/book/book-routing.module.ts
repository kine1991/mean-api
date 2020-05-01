import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './containers/books/books.component';
import { SelectedBookComponent } from './containers/selected-book/selected-book.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: ':slug',
    component: SelectedBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
