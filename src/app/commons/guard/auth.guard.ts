import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, tap } from "rxjs";
import { SessionService } from "../services/session.service";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router = inject(Router);
  const sessionSVC = inject(SessionService);
  // return sessionSVC.isLoggedInSync();

  const isLogged$ = sessionSVC.isLoggedIn();

  return isLogged$.pipe(
    tap((isLoggedIn) => isLoggedIn || router.navigate(["/auth/login"]))
  );
};

export const NoAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router = inject(Router);
  const sessionSVC = inject(SessionService);
  // return sessionSVC.isLoggedInSync();

  const isLogged$ = sessionSVC.isLoggedIn();

  return isLogged$.pipe(
    tap((isLoggedIn) => !isLoggedIn || router.navigate(["/home"]))
  );
};

/*export const authGuard: CanActivateFn = (route, state) => {
  return true;
};*/
