import { AuthState, initialAuthState } from './auth.state';
import { loginSuccess, logout, getUserInfoSuccess } from './auth.actions';
import { createReducer, on } from '@ngrx/store';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { token }): AuthState => {
    return { ...state, isAuth: true, token };
  }),
  on(getUserInfoSuccess, (state, { login }): AuthState => {
    return { ...state, login: login };
  }),
  on(logout, (): AuthState => initialAuthState)
);
