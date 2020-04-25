

export interface ResponsePosts {
  status: string;
  results: number;
  data: {
    posts: Post[]
  };
}

export interface ResponsePost {
  status: string;
  data: {
    post: Post
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
