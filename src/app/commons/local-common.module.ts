import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material/material.module";
import { LoadingComponent } from "./components/loading/loading.component";
import { LoadingOverlayComponent } from "./components/loading-overlay/loading-overlay.component";
import { CommonModule } from "@angular/common";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";

@NgModule({
  declarations: [LoadingComponent, LoadingOverlayComponent, ToolbarComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LoadingComponent,
    LoadingOverlayComponent,
    ToolbarComponent,
  ],
})
export class LocalCommonModule {}
