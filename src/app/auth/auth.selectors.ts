import { createSelector } from "@ngrx/store";

export const isLoggedInSelector = createSelector(
  state => state["auth"],
  (auth) => !!auth.user
)

export const isLoggedOutSelector = createSelector(
  isLoggedInSelector,
  loggedIn => !loggedIn
)
