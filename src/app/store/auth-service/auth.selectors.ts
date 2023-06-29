import { AuthState } from './auth.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const featureKey = 'auth';

export const selectAuthState = createFeatureSelector<AuthState>(featureKey);
export const selectIsAuth = createSelector(
  selectAuthState,
  (state) => state.isAuth
);
export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectUserInfo = createSelector(
  selectAuthState,
  (state) => state.login
);
