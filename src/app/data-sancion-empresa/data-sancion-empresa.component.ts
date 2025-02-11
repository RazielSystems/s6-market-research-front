import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-sancion-empresa',
  templateUrl: './data-sancion-empresa.component.html',
  styleUrls: ['./data-sancion-empresa.component.css']
})
export class DataSancionEmpresaComponent {
  @Input() sanciones: any[] = [];
  @Input() showInDetails: boolean = false;
  selectedSancionIndex: number = 0;

  get selectedSancion() {
    return this.sanciones[this.selectedSancionIndex];
  }

  selectSancion(index: number) {
    this.selectedSancionIndex = index;
  }
}