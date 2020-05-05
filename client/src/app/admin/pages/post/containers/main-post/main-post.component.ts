import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { NavigationExtras, Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main-post',
  templateUrl: './main-post.component.html',
  styleUrls: ['./main-post.component.scss']
})
export class MainPostComponent implements OnInit {

  displayedColumns;
  dataSource;
  length;
  pageSize = 20;
  page = 1;
  resultsOnThisPage;

  pageEvent;
  // displayedColumns: string[] = ['slug', 'topic', 'title'];

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {


    this.route.queryParams.pipe(
      switchMap((params: Params) => {
        this.pageSize = params.limit ? params.limit : 20;
        this.page = params.page;

        return this.postService.fetchPosts(params);
      })
    )
    .subscribe(post => {
      this.dataSource = post.data.posts;
      this.length = post.totalResults;
      this.resultsOnThisPage = post.results;

      this.displayedColumns = ['slug', 'title', 'topic', 'edit', 'remove'];
      console.log('post', post);
    });
  }

  removePost (slug) {
    // console.log('slug', slug);
    if (this.resultsOnThisPage === 1) {
      this.postService.removePost(slug).subscribe(() => {
        this.navigateWithParams(this.page - 1, this.pageSize);
      });
    } else {
      this.postService.removePost(slug).subscribe(() => {
        this.route.queryParams.pipe(
          switchMap((params: Params) => {
            return this.postService.fetchPosts(params);
          })
        )
        .subscribe(post => {
          this.dataSource = post.data.posts;
          this.length = post.totalResults;
          this.resultsOnThisPage = post.results;
          // console.log('post', post);
        });
      });
    }
  }

  pageChange (event) {
    // console.log(event);
    // this.pageSize = event.pageSize;
    // this.length = event.length;
    // this.page = event.pageIndex + 1;

    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: { 
        page: +event.pageIndex + 1,
        limit: +event.pageSize
      },
    };
    this.router.navigate(['admin/post'], navigationExtras);
  }

  navigateWithParams (page, limit) {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams: { 
        page: +page,
        limit: +limit
      },
    };
    this.router.navigate(['admin/post'], navigationExtras);
  }

}
