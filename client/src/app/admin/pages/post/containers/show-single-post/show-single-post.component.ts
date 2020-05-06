import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../services/post.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-show-single-post',
  templateUrl: './show-single-post.component.html',
  styleUrls: ['./show-single-post.component.scss']
})
export class ShowSinglePostComponent implements OnInit {
  post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.postService.fetchPostBySlug(params.get('slug'));
      })
    )
    .subscribe(post => {
      this.post = post.data.post
      console.log(post);
    })
  }

}
