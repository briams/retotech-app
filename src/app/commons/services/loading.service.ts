import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ILoading } from "../interfaces";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private defaultLoading: ILoading;
  loadingChange: BehaviorSubject<ILoading>;

  constructor() {
    this.defaultLoading = {
      message: "",
      show: false,
    };

    this.loadingChange = new BehaviorSubject(this.defaultLoading);
  }

  show(message: string) {
    this.loadingChange.next({
      message,
      show: true,
    });
  }

  hide() {
    this.loadingChange.next(this.defaultLoading);
  }
}
