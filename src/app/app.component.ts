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
  url: string = 'https://dev-estudio-mercado.plataformadigitalnacional.org/back/api/search';
  
  infoDetalles: any | undefined;
  infoEFO: any | undefined;
  infoSP: any[] = [];
  infoSanciones: any | undefined;
  
  selectedServidor: any = null;
  selectedSancion: any = null;
  
  selectedButton: string = 'general';
  showServidoresList: boolean = true;
  showSancionesList: boolean = true;
  
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
      this.infoSP = sp;
      this.modalInstanceSP.show();
    }
  }

  closeModalSP() {
    if (this.modalInstanceSP) {
      this.modalInstanceSP.hide();
      this.selectedServidor = null;
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
      this.selectedSancion = null;
      this.infoSanciones = undefined;
    }
  }

  openModalDetalles(data: any) {
    if (this.modalDetalles) {
      this.infoDetalles = data;
      // Estado inicial del modal
      this.selectedButton = 'general';
      this.showGeneralInfo = true;
      this.showEfosInfo = false;
      this.showServidoresInfo = false;
      this.showSancionesInfo = false;
      this.showServidoresList = true;
      this.showSancionesList = true;
      this.selectedServidor = null;
      this.selectedSancion = null;
      this.modalDetalles.show();
    }
  }

  closeModalDetalles() {
    if (this.modalDetalles) {
      this.modalDetalles.hide();
      // Reseteamos al estado inicial
      this.selectedButton = 'general';
      this.showGeneralInfo = true;
      this.showEfosInfo = false;
      this.showServidoresInfo = false;
      this.showSancionesInfo = false;
      this.showServidoresList = false;
      this.showSancionesList = false;
      this.selectedServidor = null;
      this.selectedSancion = null;
    }
  }

  // Método para controlar la visibilidad de la lista de servidores
  toggleServidoresList() {
    this.showServidoresList = !this.showServidoresList;
  }

  // Método para controlar la visibilidad de la lista de sanciones
  toggleSancionesList() {
    this.showSancionesList = !this.showSancionesList;
  }

  selectButton(buttonType: string) {
    this.selectedButton = buttonType;
    
    // Resetear estados
    this.showEfosInfo = false;
    this.showSancionesInfo = false;
    this.showServidoresInfo = false;
    this.showGeneralInfo = false;
    
    // Resetear selecciones
    this.selectedServidor = null;
    this.selectedSancion = null;
    
    switch(buttonType) {
      case 'general':
        this.showGeneralInfo = true;
        break;
      case 'efos':
        this.showEfosInfo = true;
        break;
      case 'sanciones':
        this.showSancionesInfo = true;
        break;
    }
  }

  selectServidor(servidor: any) {
    this.selectedServidor = servidor;
    this.showGeneralInfo = false;
    this.showServidoresInfo = true;
    this.showEfosInfo = false;
    this.showSancionesInfo = false;
    this.selectedSancion = null;
  }

  selectSancion(sancion: any) {
    this.selectedSancion = sancion;
    this.showGeneralInfo = false;
    this.showServidoresInfo = false;
    this.showEfosInfo = false;
    this.showSancionesInfo = true;
    this.selectedServidor = null;
  }
}