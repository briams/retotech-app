import { Validators, FormControl } from "@angular/forms";
import SCHEMA from "./../utils/schemas.utils";

export class CustomValidator extends Validators {
  static Email(control: FormControl): { [key: string]: boolean } | null {
    if (control.value && control.value.length > 0) {
      return control.value.match(SCHEMA.email) ? null : { invalid_email: true };
    }
    return null;
  }
}
