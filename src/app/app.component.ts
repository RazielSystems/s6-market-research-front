import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  show_loading: boolean = false;
  showNoResults: boolean = false;
  query: string = '';
  resultados: Array<any> = [];
  //url: string = 'http://172.20.30.161:4100/api/search';
  //url: string = 'http://localhost:4100/api/search';
  url: string = 'https://dev-estudio-mercado.plataformadigitalnacional.org/back/api/search';
  
  infoDetalles: any | undefined;
  infoEFO: any | undefined;
  infoSP: any[] = []; // Cambiado a array
  infoSanciones: any | undefined;
  selectedServidor: any = null; // Para guardar el servidor seleccionado
  
  showGeneralInfo: boolean = true;
  showEfosInfo: boolean = false;
  showServidoresInfo: boolean = false;
  showSancionesInfo: boolean = false;
  
  private modalDetalles: Modal | undefined;
  private modalInstance: Modal | undefined;
  private modalInstanceSP: Modal | undefined;
  private modalSanciones: Modal | undefined;
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Obtén la referencia al modal usando su ID
    const modalElement = document.getElementById('modalEFOS');
    const modalElementSP = document.getElementById('modalSP');
    const modalSanciones = document.getElementById('modalSanciones');
    const modalDetalles = document.getElementById('modalDetalles');

    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }

    if (modalElementSP) {
      this.modalInstanceSP = new Modal(modalElementSP);
    }

    if (modalSanciones) {
      this.modalSanciones = new Modal(modalSanciones);
    }

    if (modalDetalles) {
      this.modalDetalles = new Modal(modalDetalles);
    }
  }

  search() {
    const page: number = 1;
    const pageSize: number = 10;
    console.log('query: ', this.query);
    this.resultados = [];
    this.show_loading = true;
    this.showNoResults = false;

    const body = { query: this.query, page, pageSize };
    const options = {};

    this.http.post(this.url, body, options).subscribe((r: any) => {
      this.resultados = r.resp;
      this.show_loading = false;
      console.log('this.resultados: ', this.resultados);
      
      // Muestra el mensaje de no resultados si el arreglo está vacío
      if (this.resultados.length === 0) {
        this.showNoResults = true;
      }
    });
  }

  clearSearch() {
    this.query = '';
    this.showNoResults = false;
    this.resultados = [];
  }

  openModal(efo: any) {
    if (this.modalInstance) {
      this.infoEFO = efo;
      this.modalInstance.show();
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  openModalSP(sp: any[]) {
    if (this.modalInstanceSP) {
      this.infoSP = sp;  // Recibe un array de servidores
      this.modalInstanceSP.show();
    }
  }

  closeModalSP() {
    if (this.modalInstanceSP) {
      this.modalInstanceSP.hide();
      this.selectedServidor = null; // Limpiar la selección
      this.infoSP = [];
    }
  }

  openModalSanciones(data: any) {
    if (this.modalSanciones) {
      this.infoSanciones = data;
      this.modalSanciones.show();
    }
  }

  closeModalSanciones() {
    if (this.modalSanciones) {
      this.modalSanciones.hide();
    }
  }

  openModalDetalles(data: any) {
    if (this.modalDetalles) {
      this.infoDetalles = data;
      // Reseteamos el estado de los toggles al abrir el modal
      this.showGeneralInfo = true;
      this.showEfosInfo = false;
      this.showServidoresInfo = false;
      this.showSancionesInfo = false;
      this.modalDetalles.show();
    }
  }

  closeModalDetalles() {
    if (this.modalDetalles) {
      this.modalDetalles.hide();
      // Reseteamos el estado de los toggles al cerrar el modal
      this.showGeneralInfo = true;
      this.showEfosInfo = false;
      this.showServidoresInfo = false;
      this.showSancionesInfo = false;
    }
  }

  toggleGeneralInfo() {
    this.showGeneralInfo = !this.showGeneralInfo;
    this.showEfosInfo = false;
    this.showServidoresInfo = false;
    this.showSancionesInfo = false;
  }

  toggleEfosInfo() {
    this.showEfosInfo = !this.showEfosInfo;
    this.showGeneralInfo = false;
    this.showServidoresInfo = false;
    this.showSancionesInfo = false;
  }

  toggleServidoresInfo(servidor?: any) {
    this.showServidoresInfo = !this.showServidoresInfo;
    this.showGeneralInfo = false;
    this.showEfosInfo = false;
    this.showSancionesInfo = false;
    
    if (servidor) {
      this.selectedServidor = servidor;
    } else if (!this.showServidoresInfo) {
      this.selectedServidor = null;
    } else if (!this.selectedServidor && this.infoDetalles?.servidores_publicos?.length) {
      this.selectedServidor = this.infoDetalles.servidores_publicos[0];
    }
  }

  toggleSancionesInfo() {
    this.showSancionesInfo = !this.showSancionesInfo;
    this.showGeneralInfo = false;
    this.showEfosInfo = false;
    this.showServidoresInfo = false;
  }

  selectServidor(servidor: any) {
    this.selectedServidor = servidor;
  }
  
}