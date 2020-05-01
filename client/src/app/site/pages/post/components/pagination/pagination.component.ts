import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() allPostsCount;
  @Input() limit;
  @Input() page;
  allPages = 1;
  // allPages = Math.ceil(this.allPostsCount / this.limit);

  constructor() { }

  ngOnInit() {
    console.log(this.allPostsCount);
    // console.log(this.allPostsCount);
    // this.allPages = Math.ceil(this.allPostsCount / this.limit);
  }

}
