import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { AuthActions } from './auth/action-types';
import { isLoggedInSelector, isLoggedOutSelector } from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedout$: Observable<boolean>;

    constructor(private router: Router, private store: Store<AppState>) {

    }

    ngOnInit() {

      this.isLoggedIn$ = this.store.pipe(
        select(isLoggedInSelector)
      )

      this.isLoggedout$ = this.store.pipe(
        select(isLoggedOutSelector)
      )

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

    }

    logout() {
      this.store.dispatch(AuthActions.logoutAction())
      this.router.navigate(['../'])
    }

}
