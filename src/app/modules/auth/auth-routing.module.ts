import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./pages/login/login.component";
import { ValidateRegisterComponent } from "./pages/validate-register/validate-register.component";
import { RegisterComponent } from "./pages/register/register.component";

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "validate",
        component: ValidateRegisterComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },
      {
        path: "**",
        redirectTo: "login",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
