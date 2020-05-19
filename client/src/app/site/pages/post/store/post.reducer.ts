import * as PostActions from './post.actions';

export interface State {
  posts: any;
  post: any;
  allPostsCount: any;
  postError: any;
  isLoading: boolean;
  isLoadingFilter: any;
  isLoadingComment: any;
  filter: any;
  reviews: any;
}

const initialState = {
  posts: [],
  post: null,
  allPostsCount: undefined,
  postError: null,
  isLoading: false,
  isLoadingFilter: false,
  isLoadingComment: false,
  filter: null,
  reviews: undefined
};

export const postReducer = (state = initialState, action: PostActions.PostActions) => {
  switch (action.type) {
    // FETCH POSTS
    case PostActions.FETCH_POSTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case PostActions.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload.data.posts,
        allPostsCount: action.payload.totalResults
      };
    case PostActions.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        posts: action.payload
      };
    // FETCH POST BY SLUG
    case PostActions.FETCH_POST_BY_SLUG_START:
      return {
        ...state,
        isLoading: true,
      };
    case PostActions.FETCH_POST_BY_SLUG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.payload.data.post
      };
    case PostActions.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        posts: action.payload
      };

    // FETCH COMMENTS BY POST
    case PostActions.FETCH_COMMENTS_BY_POST_START:
      return {
        ...state,
        isLoadingComment: true,
      };
    case PostActions.FETCH_COMMENTS_BY_POST_SUCCESS:
      return {
        ...state,
        isLoadingComment: false,
        reviews: action.payload.data.reviews
      };
    case PostActions.FETCH_COMMENTS_BY_POST_FAILURE:
      return {
        ...state,
        isLoadingComment: false,
        reviews: 'action'
      };

    // FETCH FILTER BY POSTS
    case PostActions.FETCH_POST_FILTER_START:
      return {
        ...state
      };
    case PostActions.FETCH_POST_FILTER_SUCCESS:
      return {
        ...state,
        filter: action.payload.filter
      };
    case PostActions.FETCH_POST_FILTER_FAILURE:
      return {
        ...state,
        message: 'action.payload'
      };
    // CLEAR
    case PostActions.CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        allPostsCount: undefined
      };
    case PostActions.CLEAR_POST:
      return {
        ...state,
        post: null
      };
    default:
      return state;
  }
};
