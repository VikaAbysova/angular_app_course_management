import { Credentials } from './../../interfaces/credentials.interface';
import { EUserActions } from './auth-actions.types';
import { Token } from './../../interfaces/token.interface';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  EUserActions.AUTH_LOGIN,
  props<{ credentials: Credentials }>()
);
export const loginSuccess = createAction(
  EUserActions.AUTH_LOGIN_SUCCESS,
  props<{ token: Token }>()
);
export const logout = createAction(EUserActions.AUTH_LOGOUT);

export const getUserInfo = createAction(
  EUserActions.AUTH_GET_USER_INFO
);

export const getUserInfoSuccess = createAction(
  EUserActions.AUTH_GET_USER_INFO_SUCCESS,
  props<{ login: string }>()
);
