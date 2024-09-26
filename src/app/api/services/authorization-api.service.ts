import { Injectable } from "@angular/core";
import { Observable, delay, of, tap, throwError } from "rxjs";
import { ILoginReq } from "../interfaces";
import { LocalStorageService } from "src/app/commons/services/local-storage.service";
import { IUser } from "src/app/commons/interfaces/users.interface";
import { AppConfig } from "src/app/config/app.config";
import { SessionService } from "src/app/commons/services/session.service";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/commons/services/loader.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizationAPIService {
  userList: IUser[] = [];

  constructor(
    private _router: Router,
    private _sessionSVC: SessionService,
    private _loaderSVC: LoaderService,
    private _localStorageSVC: LocalStorageService
  ) {
    console.log("llegue aqui");
    this.checkAuthStatus();
  }

  login(body: ILoginReq): Observable<any> {
    this._loaderSVC.show("Cargando ...");

    const userList: IUser[] = this._localStorageSVC.getItem(
      AppConfig.keyUsers,
      true
    );
    const user = userList.find((i) => i.email === body.email);
    if (!user) {
      return throwError(() => "Usuario o pass invalido");
    }
    if (user.password != body.password) {
      return throwError(() => "Usuario o pass invalido");
    }

    return of({
      token: "fadsfsdfasdfdsfdas",
    }).pipe(
      delay(2000),
      tap(({ token }) => this._sessionSVC.setAuthenticatedSession(token)),
      tap(() => this._sessionSVC.setUserinfo(user)),
      // tap(() => this._loaderSVC.hide()),
      tap(console.log)
    );
  }

  validateEmail(email: string) {
    this._loaderSVC.show("Cargando ...");
    const userList: IUser[] = this._localStorageSVC.getItem(
      AppConfig.keyUsers,
      true
    );
    const user = userList.find((i) => i.email === email);

    return of(!!user).pipe(
      delay(1500),
      tap(() => this._loaderSVC.hide())
    );
  }

  checkAuthStatus() {
    this._loaderSVC.show("Cargando ...");
    this._sessionSVC
      .isLoggedIn()
      .pipe(delay(2000))
      .subscribe((isLogged) => {
        console.log({ isLogged });
        if (!isLogged) {
          this._router.navigate(["auth/login"]);
        }
        if (isLogged) {
          this._router.navigate(["home"]);
        }
        this._loaderSVC.hide();
      });
  }

  logout(): Observable<boolean> {
    this._loaderSVC.show("Cerrando Sesion ...");
    return of(true).pipe(
      delay(1500),
      tap(() => this._sessionSVC.setUnAuthenticated()),
      tap(console.log),
      tap(() => this._loaderSVC.hide())
    );
  }
}
