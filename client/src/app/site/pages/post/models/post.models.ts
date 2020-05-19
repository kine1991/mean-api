

export interface ResponsePosts {
  status: string;
  results: number;
  totalResults: number;
  data: {
    posts: Post[]
  };
}

export interface ResponseReviews {
  status: string;
  results: number;
  totalResults: number;
  data: {
    reviews: Review[]
  };
}

export interface Review {
  _id: string,
  review: string,
  publisher: Publisher,
  post: string,
  createdAt: string | Date,
  id: string
}

// "status": "success",
// "data": {
//     "reviews": [
//         {
//             "_id": "5ebd2db7ea1b271e5297acab",
//             "review": "Cool!!!",
//             "user": {
//                 "_id": "5e4c1c885451fc08ca440519",
//                 "name": "user1",
//                 "photo": "https://i.ibb.co/F6YKxyw/user1.png"
//             },
//             "post": "5ebd12832afa1c1bd165206b",
//             "createdAt": "2020-05-14T11:38:31.474Z",
//             "__v": 0,
//             "id": "5ebd2db7ea1b271e5297acab"
//         },

export interface ResponsePost {
  status: string;
  data: {
    post: Post
  };
}

export interface ResponsePostFilter {
  status: string;
  filter: {
    topic: string[];
    tag: string[];
  };
}

export interface Post {
  title: string;
  topic: string;
  content: string;
  description?: string;
  private: boolean;
  publisher: Publisher;
  date: Date;
  imageUrl?: string;
  likes: [string];
  showCount: number;
  slug: string;
  tag?: [string];
}

export interface Publisher {
  role: string;
  _id: string;
  name: string;
  email: string;
  photo: string;
}
