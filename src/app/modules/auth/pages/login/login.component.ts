import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthorizationAPIService } from "src/app/api/services/authorization-api.service";
import { LoaderService } from "src/app/commons/services/loader.service";
import { ValidatorErrors } from "src/app/commons/utils/validator-errors.utils";
import { CustomValidator } from "src/app/commons/validators/custom-validators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  form: FormGroup = this._formBuilder.group({
    email: ["", [Validators.required, CustomValidator.Email]],
    password: ["", [Validators.required, Validators.minLength(4)]],
  });

  hidePass: boolean = true;

  constructor(
    private _router: Router,
    private _loaderSVC: LoaderService,
    private _authorizationAPISVC: AuthorizationAPIService,
    private _formBuilder: FormBuilder
  ) {}

  onLogin(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.getRawValue();

    this._authorizationAPISVC.login(data).subscribe({
      next: () => {
        // this._loaderSVC.hide();
        this._router.navigate([""]);
      },
      error: (err) => {
        console.error(err);
        this._loaderSVC.hide();
      },
    });
  }

  clickIconPassInput(event: MouseEvent) {
    this.hidePass = !this.hidePass;
    event.stopPropagation();
  }

  isInvalidField(field: string) {
    return ValidatorErrors.isInvalidField(this.form, field);
  }

  getErrorMessage(field: string) {
    return ValidatorErrors.getErrorMessage(this.form, field);
  }

  setFieldTouched(field: string) {
    this.form.controls[field].markAsTouched();
  }
}
