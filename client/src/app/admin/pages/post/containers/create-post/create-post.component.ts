import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl(''),
      topic: new FormControl(''),
      description: new FormControl(''),
      content: new FormControl(''),
      imageUrl: new FormControl(''),
      private: new FormControl(false),
      tags: new FormArray([new FormControl('')]),

    });

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
          return this.topicOptions;
          return this.autoCompleteFormArrayFilter(value)
        })
      )
      
      // .subscribe(val => {
      //   console.log('val', val);
      // })
    });

    // .subscribe()
    // .subscribe(val => {
    //   console.log('topic LLL', val);
    //   this.autoCompleteFilter(val);
    // })
  }

  submit () {
    console.log(this.postForm);
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
    // this.filteredTagsOptions.subscribe(s => {
    //   console.log('s', s)
    // })
  }
}
// private _filter(value: string): string[] {
//   const filterValue = value.toLowerCase();

//   return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
// }
    // this.filteredTopicOptions = this.postForm.get('topic').valueChanges.pipe(
    //   startWith(''),
    //   map(value => this.autoCompleteFilter(value))
    // ).subscribe(() => {});

      // return true;
      // topicOption.toLowerCase().indexOf(filterValue) === 0
            // console.log('filter', filter.topic)