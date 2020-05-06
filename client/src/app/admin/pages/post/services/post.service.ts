import { Injectable } from '@angular/core';
import { AdminModule } from 'src/app/admin/admin.module';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// content: "Важно, чтобы тег title побуждал пользователя переходить по ссылке на ваш пост из поисковой выдачи (или где бы она ни появилась).  Вот ещё пара причин, почему теги title важны:  Первое впечатление: ваш заголовок — это обычно первое что видят потенциальные посетители, когда что-то ищут. Это ваш шанс произвести хорошее впечатление; Презентация бренда: Люди доверяют брендам. Если вы широко известны в своей отрасли, убедитесь что бренд хорошо виден в заголовке. Опять же, так вы побуждаете кликать, что даст вам больше трафика (подробнее об этом далее). И не забывайте, что Google (и другие поисковые системы), помимо прочего, смотрят на ваш тег title, чтобы понять о чём идёт речь на странице.  Скорее всего, именно поэтому существует лёгкая корреляция между использованием ключевых слов в теге title и позициями."
// date: "2020-04-25T08:16:57.876Z"
// description: "News API is a simple and easy-to-use API that returns JSON metadata for headlines and articles live all over the web right now"
// imageUrl: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1431712415l/329866.jpg"
// likes: []
// private: false
// publisher: {role: "user", _id: "5e4c1c885451fc08ca440519", name: "user1", email: "user1@mail.ru", photo: "https://i.ibb.co/F6YKxyw/user1.png"}
// showCount: 0
// slug: "title1-5e4c1c885451fc08ca440519"
// tag: ["tag1"]
// title: "News API is a simple and easy-to-use API that returns JSON metadata for headlines and articles live all over the web right now"
// topic: "news"
// _id: "5ea3f1f9d7cb0d05946acbf6"

export interface Publisher {
  _id: string;
  role: string,
  name: string;
  email: string;
  photo?: string;
}


export interface Post {
  _id: string;
  content: string;
  date: Date | string;
  description: string;
  imageUrl: string;
  likes: string[];
  private: boolean;
  publisher: Publisher;
  showCount: number;
  slug: string;
  tags: string[];
  title: string[];
  topic: string;
}

export interface PostsResponse {
  status: string;
  data: {
    posts: Post[]
  };
  results: number;
  totalResults: number;
}

export interface PostResponse {
  status: string;
  data: {
    post: Post
  };
}

export interface FilterResponse {
  status: string;
  filter: {
    tags: string[];
    topic: string[];
  }
}

@Injectable({
  providedIn: AdminModule
  // providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  fetchPosts (params?) {
    return this.http.get<PostsResponse>(`${environment.url}/api/v1/posts`, {
      params
      // params: {
      //   'limit': '10'
      // }
    });
  }

  fetchPostBySlug (slug) {
    return this.http.get<PostResponse>(`${environment.url}/api/v1/posts/${slug}`);
  }

  createPost (post) {
    return this.http.post<any>(`${environment.url}/api/v1/posts`, post);
  }

  removePost (slug) {
    return this.http.delete(`${environment.url}/api/v1/posts/${slug}`);
  }

  getPostFilter () {
    return this.http.get<FilterResponse>(`${environment.url}/api/v1/posts/getFilter`);
  }
}
