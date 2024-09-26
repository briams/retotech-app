import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth-routing.module";
import { LocalCommonModule } from "src/app/commons/local-common.module";

import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./pages/login/login.component";
import { ValidateRegisterComponent } from "./pages/validate-register/validate-register.component";
import { RegisterComponent } from "./pages/register/register.component";
import { HeaderComponent } from "./components/header/header.component";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ValidateRegisterComponent,
    RegisterComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    LocalCommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}
