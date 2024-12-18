import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-servidor-publico',
  templateUrl: './data-servidor-publico.component.html',
  styleUrls: ['./data-servidor-publico.component.css'],
})
export class DataServidorPublicoComponent {
  @Input() servidores: any = [];

  activeTab: string = 'empleo';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
