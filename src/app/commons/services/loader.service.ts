import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface LoaderState {
  visible: boolean;
  msg: string;
}

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  /** Observable para la saber si esta logeado */
  private loaderStateObs = new BehaviorSubject<LoaderState>({
    visible: true,
    msg: "",
  });

  constructor() {}

  state(): Observable<LoaderState> {
    return this.loaderStateObs;
  }

  show(msg: string = "") {
    this.loaderStateObs.next({
      visible: true,
      msg,
    });
  }

  hide() {
    this.loaderStateObs.next({
      visible: false,
      msg: "",
    });
  }
}
