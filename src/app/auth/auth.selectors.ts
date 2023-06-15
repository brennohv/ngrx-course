import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const selectAuthState =
  createFeatureSelector<AuthState>("auth")

export const isLoggedInSelector = createSelector(
  selectAuthState,
  (auth) => !!auth.user
)

export const isLoggedOutSelector = createSelector(
  isLoggedInSelector,
  loggedIn => !loggedIn
)
