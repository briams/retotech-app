import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoaderService } from "../../services/loader.service";
@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
})
export class LoadingComponent implements OnInit, OnDestroy {
  message: string = "";
  show: boolean = false;

  constructor(private loadingService: LoaderService) {
    this.loadingService.state().subscribe(
      ({ msg, visible }) => {
        this.message = msg;
        this.show = visible;
      }
    );
  }

  ngOnInit() {
    //
  }

  ngOnDestroy(): void {
    //
  }
}
