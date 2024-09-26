import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidatorErrors {
  static getControlToForm(
    form: FormGroup,
    field: string
  ): AbstractControl<any, any> {
    return form.controls[field];
  }

  static isInvalidField(form: FormGroup, field: string): boolean {
    return form.controls[field].invalid;
  }

  static getErrorMessage(form: FormGroup, field: string): string {
    const control = ValidatorErrors.getControlToForm(form, field);

    for (let propertyName in control.errors) {
      if (control.errors.hasOwnProperty(propertyName)) {
        return ValidatorErrors.getValitorMessage(
          propertyName,
          control.errors[propertyName]
        );
      }
    }

    return "";
  }

  static getValitorMessage(name: string, value?: any) {
    const messages: { [key: string]: string } = {
      required: "Este campo es requerido.",
      email: "El email ingresado no es válido.",
      minlength: `Requiere ${value.requiredLength} caracteres como mínimo.`,
      maxlength: `Requiere ${value.requiredLength} caracteres como máximo.`,
      limitMinMax: `El valor debe estar entre ${value.min} - ${value.max}`,
      invalid_email: "El email ingresado no es válido",
    };

    return messages[name];
  }
}
