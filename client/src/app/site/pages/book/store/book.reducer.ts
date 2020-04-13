import * as BookActions from './book.actions';

export interface State {
  books: any;
  book: any;
  bookError: any;
  isLoading: boolean;
}

const initialState = {
  books: [],
  book: null,
  results: null,
  bookError: null,
  isLoading: false
};

export const bookReducer = (state = initialState, action: BookActions.BookActions) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
