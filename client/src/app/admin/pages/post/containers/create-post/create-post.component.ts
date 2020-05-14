import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import * as slugify from '@sindresorhus/slugify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  topicOptions: string[] = [];
  tagsOptions: string[] = [];
  filteredTopicOptions: Observable<any>;
  filteredTagsOptions: Observable<any>;
  // filteredTopicOptions: Observable<string[]>;

  constructor(
    private postService: PostService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl('1. sunt aut facere repellat provident occaecati excepturi optio reprehenderit', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      slug: new FormControl('', Validators.required),
      topic: new FormControl('sport', Validators.required),
      description: new FormControl('est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'),
      content: new FormControl('est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla', [Validators.required, Validators.minLength(150)]),
      imageUrl: new FormControl('https://via.placeholder.com/600/9c184f'),
      private: new FormControl(false),
      tags: new FormArray([new FormControl('tag1'), new FormControl('tag2')]),
    });

    // change slug depend on title
    this.postForm.get('title').valueChanges.pipe(
      // startWith(''),
      map(value => slugify(value))
    ).subscribe((value) => {
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
  }

  submit () {
    // console.log(this.postForm.value);
    if (this.postForm.valid) {
      this.postService.createPost({...this.postForm.value}).subscribe(() => {
        this._snackBar.open('post was created', 'close', {
          duration: 5000,
        });
        this.router.navigate(['admin/post']);
      });
    } else {
      this._snackBar.open('error', 'close', {
        duration: 5000,
      });
    }
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

  private autoCompleteFilter (value) {
    const filterValue = value.toLowerCase();
    return this.topicOptions.filter(topicOption => topicOption.toLowerCase().includes(filterValue));
  }

  private autoCompleteFormArrayFilter (value) {
    return this.topicOptions;
    // const filterValue = value ? value[0].toLowerCase() : '';
    // // console.log('filterValue', filterValue);
    // return this.topicOptions.filter(topicOption => topicOption.toLowerCase().includes(filterValue));
  }

  test(){
    const x = this.postForm.get('tags')
    console.log(x)
  }
}