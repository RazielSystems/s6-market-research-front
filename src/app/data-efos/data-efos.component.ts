import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-efos',
  templateUrl: './data-efos.component.html',
  styleUrls: ['./data-efos.component.css'],
})
export class DataEfosComponent {
  @Input() efos: any = [];
}
