import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap, startWith, map, tap, delay } from 'rxjs/operators';
import { Observable, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import slugify from '@sindresorhus/slugify';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  postForm: FormGroup;
  topicOptions: string[] = [];
  tagsOptions: string[] = [];
  filteredTopicOptions: Observable<any>;
  filteredTagsOptions: Observable<any>;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.postService.fetchPostBySlug(params.get('slug'));
      })
    ).subscribe(post => {
      console.log(post.data.post);
      const {title, slug, topic, description, content, imageUrl, tags} = post.data.post;
      this.postForm = new FormGroup({
        title: new FormControl(title, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        slug: new FormControl(slug, Validators.required),
        topic: new FormControl(topic, Validators.required),
        description: new FormControl(description),
        content: new FormControl(content, [Validators.required, Validators.minLength(150)]),
        imageUrl: new FormControl(imageUrl),
        private: new FormControl(post.data.post.private),
        tags: new FormArray(tags.map(tag => new FormControl(tag))),
      });

      // change slug depend on title
      this.postForm.get('title').valueChanges.pipe(
        // startWith(''),
        map(value => slugify(value))
      ).subscribe((value) => {
        console.log(value);
        this.postForm.get('slug').setValue(value)
      })

      this.postService.getPostFilter().subscribe(({ filter }) => {
        this.topicOptions = filter.topic;
        this.tagsOptions = filter.tags;
  
        this.filteredTopicOptions = this.postForm.get('topic').valueChanges.pipe(
          startWith(''),
          map(value => this.autoCompleteFilter(value))
        )
  
        this.filteredTagsOptions = this.postForm.get('tags').valueChanges.pipe(
          startWith(''),
          map((value) => {
            return this.tagsOptions;
          })
        )
      });
    });


  }

  private autoCompleteFilter (value) {
    const filterValue = value.toLowerCase();
    return this.topicOptions.filter(topicOption => topicOption.toLowerCase().includes(filterValue));
  }

  get tags() {
    return this.postForm.get('tags') as FormArray;
  }

  addTags () {
    this.tags.push(new FormControl(''));
  }

  removeTag (i) {
    this.tags.removeAt(i);
  }

  submit () {
    // console.log(this.postForm.valid);
    if (this.postForm.valid) {
      const slug = this.route.snapshot.paramMap.get('slug');
      this.postService.updatePost(slug, this.postForm.value)
      .subscribe(() => {
        this._snackBar.open('post was created', 'close', {
          duration: 5000,
        });
        this.router.navigate(['admin/post']);
      });
    } else {
      alert('invalid form')
    }
  }

}
