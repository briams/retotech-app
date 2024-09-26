import { Component, Input } from "@angular/core";
import { AuthorizationAPIService } from "../../../api/services/authorization-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent {
  @Input() title?: string;

  expanded = false;

  constructor(
    private _authorizationAPISVC: AuthorizationAPIService,
    private _router: Router
  ) {}

  onLogout() {
    this._authorizationAPISVC.logout().subscribe(() => {
      this._router.navigate(["/auth"]);
    });
  }
}
