import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { IUser } from "../interfaces/users.interface";
import { AppConfig } from "src/app/config/app.config";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private isLoggedInObs = new BehaviorSubject<boolean>(this.isLoggedInSync());
  private userInfo = new BehaviorSubject<IUser>(this.getUserInfo());

  constructor(private _localStorageService: LocalStorageService) {
    this.userInfoPublish();
  }

  isLoggedInSync(): boolean {
    const session: string = this.getToken();
    return !!session;
  }

  getToken(): string {
    return this._localStorageService.getItem(AppConfig.keyToken) ?? "";
  }

  getUserInfo(): IUser {
    return (this._localStorageService.getItem(AppConfig.keyUserInfo, true) ??
      {}) as IUser;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInObs;
  }

  isLoggedInPublish(): void {
    this.isLoggedInObs.next(this.isLoggedInSync());
  }

  userInfoPublish() {
    this.userInfo.next(this.getUserInfo());
  }

  setAuthenticatedSession(token: string): void {
    this._localStorageService.setItem(AppConfig.keyToken, token);
    this.isLoggedInPublish();
  }

  setUserinfo(user: IUser): void {
    this._localStorageService.setItem(AppConfig.keyUserInfo, user, true);
    this.userInfoPublish();
  }

  setUnAuthenticated() {
    // Borramos ambos valores del localStorage
    this._localStorageService.remove(AppConfig.keyToken);
    this._localStorageService.remove(AppConfig.keyUserInfo);

    this.userInfoPublish();
    this.isLoggedInPublish();
  }
}
