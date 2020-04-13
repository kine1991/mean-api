export interface User {
  role: string;
  _id: string;
  name: string;
  email: string;
  photo?: string;
}

export interface Book {
  private: boolean;
  releaseBook: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  _id: string;
  author: string;
  name: string;
  imageThumbnailUrl?: string;
  imageUrl?: string;
  description: string;
  publisher?: User;
  price: number;
  priceDiscount: number;
  pages: number;
  createdAt?: string | Date;
  genre?: string;
  slug?: string;
  authorRef?: string;
  priceInRubles?: number;
  id: string;
}

export interface ResponseBooks {
  status: string;
  results: number;
  data: {
    books: Book[]
  };
}

export interface ResponseBook {
  status: string;
  data: {
    book: Book
  };
}
