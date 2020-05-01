import * as BookActions from './book.actions';

export interface State {
  books: any;
  book: any;
  allBooksCount: any;
  bookError: any;
  isLoading: boolean;
  isLoadingFilter: any;
  filter: any;
}

const initialState = {
  books: [],
  book: null,
  allBooksCount: undefined,
  bookError: null,
  isLoading: false,
  isLoadingFilter: undefined,
  filter: null,
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
    // FETCH ALL COUNT BOOKS
    case BookActions.FETCH_BOOKS_COUNT_START:
      return {
        ...state,
      };
    case BookActions.FETCH_BOOKS_COUNT_SUCCESS:
      return {
        ...state,
        allBooksCount: action.payload.countBooks
      };
    case BookActions.FETCH_BOOKS_COUNT_FAILURE:
      return {
        ...state,
        bookError: 'action.payload'
      };
    // FETCH FILTER
    case BookActions.FETCH_FILTER_START:
      return {
        ...state,
        isLoadingFilter: true
      };
    case BookActions.FETCH_FILTER_SUCCESS:
      return {
        ...state,
        isLoadingFilter: false,
        filter: action.payload.filter,
      };
    // case BookActions.FETCH_FILTER_FAILURE:
    //   return {
    //     ...state,
    //     isLoadingFilter: false,
    //     bookError: 'action.payload'
    //   };
    // CLEAR
    case BookActions.CLEAR_BOOKS:
      return {
        ...state,
        books: [],
        allBooksCount: undefined
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
