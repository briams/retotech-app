import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
})
export class LoadingOverlayComponent implements OnInit {
  @Input() public message: string = '';

  ngOnInit(): void {
    //
  }
}
