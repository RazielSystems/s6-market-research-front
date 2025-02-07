import { Component, Input } from '@angular/core';

interface Empleo {
  nombreEntePublico?: string;
  areaAdscripcion?: string;
  empleoCargoComision?: string;
  funcionPrincipal?: string;
  fechaTomaPosesion?: string;
  telefonoOficina?: {
    telefono?: string;
    extension?: string;
  };
}

interface Participacion {
  nombreEmpresaSociedadAsociacion?: string;
  rfc?: string;
  tipoParticipacion?: {
    valor?: string;
  };
  porcentajeParticipacion?: number;
  sector?: {
    valor?: string;
  };
  ubicacion?: {
    entidadFederativa?: {
      valor?: string;
    };
  };
  recibeRemuneracion?: boolean;
  montoMensual?: {
    valor?: number;
  };
}

interface ServidorPublico {
  empleo?: Empleo;
  participacion?: Participacion;
  declarante?: {
    nombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
  };
}

@Component({
  selector: 'app-data-servidor-publico',
  templateUrl: './data-servidor-publico.component.html',
  styleUrls: ['./data-servidor-publico.component.css']
})
export class DataServidorPublicoComponent {
  @Input() servidores: ServidorPublico | ServidorPublico[] | null = null;
  activeTab: string = 'empleo';
  selectedServidorIndex: number = 0;

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Método helper para verificar si es array
  isServidoresArray(): boolean {
    return Array.isArray(this.servidores);
  }

  // Método helper para obtener el array de servidores de forma segura para *ngFor
  getServidoresArray(): ServidorPublico[] {
    return this.isServidoresArray() ? (this.servidores as ServidorPublico[]) : [];
  }

  // Seleccionar un servidor específico del array
  selectServidor(servidor: ServidorPublico) {
    if (this.isServidoresArray()) {
      const index = (this.servidores as ServidorPublico[]).indexOf(servidor);
      if (index !== -1) {
        this.selectedServidorIndex = index;
      }
    }
  }

  // Obtener el servidor actual para mostrar
  getCurrentServidor(): ServidorPublico | null {
    if (this.isServidoresArray()) {
      const servidoresArray = this.servidores as ServidorPublico[];
      return servidoresArray[this.selectedServidorIndex] || null;
    }
    return this.servidores as ServidorPublico;
  }
}