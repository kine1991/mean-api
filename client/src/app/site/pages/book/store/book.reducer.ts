import * as BookActions from './book.actions';

export interface State {
  books: any;
  book: any;
  results: any;
  bookError: any;
  isLoading: boolean;
}

const initialState = {
  books: [],
  book: null,
  results: undefined,
  bookError: null,
  isLoading: false
};

export const bookReducer = (state = initialState, action: BookActions.BookActions) => {
  switch (action.type) {
    // FETCH BOOKS
    case BookActions.FETCH_BOOKS_START:
      return {
        ...state,
        isLoading: true
      };
    case BookActions.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        results: action.payload.results,
        books: action.payload.data.books,
      };
    case BookActions.FETCH_BOOKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        bookError: 'action.payload'
      };
    // FETCH BOOK
    case BookActions.FETCH_BOOK_START:
      return {
        ...state,
        isLoading: true
      };
    case BookActions.FETCH_BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        book: action.payload.data.book,
      };
    case BookActions.FETCH_BOOK_FAILURE:
      return {
        ...state,
        isLoading: false,
        bookError: 'action.payload'
      };
    // CLEAR
    case BookActions.CLEAR_BOOKS:
      return {
        ...state,
        books: [],
        results: undefined
      };
    case BookActions.CLEAR_BOOK:
      return {
        ...state,
        book: null
      };
    default:
      return state;
  }
};
