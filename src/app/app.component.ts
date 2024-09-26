import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { LocalStorageService } from "./commons/services/local-storage.service";
import { AppConfig } from "./config/app.config";
import { data } from "./mocks/data";
import { IUser } from "./commons/interfaces/users.interface";
import { AuthorizationAPIService } from "./api/services/authorization-api.service";
import { LoaderService } from "./commons/services/loader.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  loaderVisible: boolean = true;
  loaderMsg: string = "";

  constructor(
    private loaderSVC: LoaderService,
    private _localStorageSVC: LocalStorageService,
    private _cd: ChangeDetectorRef,
    private _authorizationAPISVC: AuthorizationAPIService
  ) {}

  ngOnInit(): void {
    const users: IUser[] = this._localStorageSVC.getItem(
      AppConfig.keyUsers,
      true
    );

    if (!users) {
      this._localStorageSVC.setItem(AppConfig.keyUsers, data.users, true);
    }
  }

  ngAfterViewInit() {
    this.loaderSVC.state().subscribe((state) => {
      this.loaderVisible = state.visible;
      this.loaderMsg = state.msg;
      this._cd.detectChanges();
    });
  }
}
