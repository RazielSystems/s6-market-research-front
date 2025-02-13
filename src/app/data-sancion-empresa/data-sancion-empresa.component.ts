import { Component, Input } from '@angular/core';

interface ResolucionSancion {
  sentido: string;
  url: string;
  fechaNotificacion: string;
}

interface ParticularSancionado {
  nombreRazonSocial: string;
  objetoSocial: string;
  tipoPersona: string;
}

interface ResponsableSancion {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
}

interface InstitucionDependencia {
  nombre: string;
  siglas: string;
}

interface TipoSancion {
  valor: string;
}

interface Sancion {
  causaMotivoHechos: string;
  acto: string;
  tipoSancion: TipoSancion;
  particularSancionado: ParticularSancionado;
  resolucion: ResolucionSancion;
  responsableSancion: ResponsableSancion;
  institucionDependencia: InstitucionDependencia;
}

@Component({
  selector: 'app-data-sancion-empresa',
  templateUrl: './data-sancion-empresa.component.html',
  styleUrls: ['./data-sancion-empresa.component.css']
})
export class DataSancionEmpresaComponent {
  @Input() sanciones: Sancion | Sancion[] | null = null;
  @Input() showInDetails: boolean = false;
  
  selectedSancionIndex: number = 0;
  activeTab: string = 'causal';

  // Método helper para verificar si es array
  isSancionesArray(): boolean {
    return Array.isArray(this.sanciones);
  }

  // Método helper para obtener el array de sanciones de forma segura para *ngFor
  getSancionesArray(): Sancion[] {
    return this.isSancionesArray() ? (this.sanciones as Sancion[]) : [];
  }

  // Seleccionar una sanción específica del array
  selectSancion(sancion: Sancion) {
    if (this.isSancionesArray()) {
      const index = (this.sanciones as Sancion[]).indexOf(sancion);
      if (index !== -1) {
        this.selectedSancionIndex = index;
      }
    }
  }

  // Obtener la sanción actual para mostrar
  getCurrentSancion(): Sancion | null {
    if (this.isSancionesArray()) {
      const sancionesArray = this.sanciones as Sancion[];
      return sancionesArray[this.selectedSancionIndex] || null;
    }
    return this.sanciones as Sancion;
  }

  // Establecer el tab activo
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}