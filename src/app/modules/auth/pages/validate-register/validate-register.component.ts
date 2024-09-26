import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthorizationAPIService } from "src/app/api/services/authorization-api.service";
import { LoaderService } from "src/app/commons/services/loader.service";
import { ValidatorErrors } from "src/app/commons/utils/validator-errors.utils";
import { CustomValidator } from "src/app/commons/validators/custom-validators";

@Component({
  selector: "app-validate-register",
  templateUrl: "./validate-register.component.html",
  styleUrls: ["./validate-register.component.scss"],
})
export class ValidateRegisterComponent {
  emailExist: boolean = false;

  form: FormGroup = this._formBuilder.group({
    email: ["", [Validators.required, CustomValidator.Email]],
  });

  constructor(
    private _router: Router,
    private _loaderSVC: LoaderService,
    private _authorizationAPISVC: AuthorizationAPIService,
    private _formBuilder: FormBuilder
  ) {}

  onValidate(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.getRawValue();

    this._authorizationAPISVC.validateEmail(data.email).subscribe({
      next: (emailExist) => {
        this.emailExist = emailExist;
        if (!emailExist) {
          this._router.navigate(["/auth/register"]);
        }
      },
    });
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
