import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-sancion-empresa',
  templateUrl: './data-sancion-empresa.component.html',
  styleUrls: ['./data-sancion-empresa.component.css'],
})
export class DataSancionEmpresaComponent {
  @Input() sanciones: any = [];
}
