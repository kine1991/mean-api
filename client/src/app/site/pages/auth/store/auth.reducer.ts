import * as AuthActions from './auth.actions';

export interface State {
  currentUser: {
    role: string;
    _id: string;
    name: string;
    email: string;
    photo?: string;
  };
  authError: any;
  isLoading: boolean;
}

const initialState = {
  currentUser: null,
  authError: null,
  isLoading: false
};

// status: "success"
// data:
// user:
// role: "user"
// _id: "5e4c1c885451fc08ca440519"
// name: "user1"
// email: "user1@mail.ru"
// photo: "https://i.ibb.co/F6YKxyw/user1.png"

export const authReducer = (state = initialState, action: AuthActions.AuthActions) => {
  switch (action.type) {
    // SIGN IN
    case AuthActions.SIGN_IN_START:
      return {
        ...state,
        isLoading: true
      };
    case AuthActions.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload
      };
    case AuthActions.SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        authError: action.payload
      };
    // AUTO LOGIN
    case AuthActions.AUTO_LOGIN_START:
      return {
        ...state,
        isLoading: true
      };
    case AuthActions.AUTO_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload
      };
    case AuthActions.AUTO_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        authError: action.payload
      };

    // LOGOUT
    case AuthActions.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
        authError: null
      };

    default:
      return state;
  }
};

