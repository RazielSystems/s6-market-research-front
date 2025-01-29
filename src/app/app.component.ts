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
  
  infoEFO: any | undefined;
  infoSP: any | undefined;
  infoSanciones: any | undefined;
  private modalInstance: Modal | undefined;
  private modalInstanceSP: Modal | undefined;
  private modalSanciones: Modal | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Obtén la referencia al modal usando su ID
    const modalElement = document.getElementById('modalEFOS');
    const modalElementSP = document.getElementById('modalSP');
    const modalSanciones = document.getElementById('modalSanciones');

    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }

    if (modalElementSP) {
      this.modalInstanceSP = new Modal(modalElementSP);
    }

    if (modalSanciones) {
      this.modalSanciones = new Modal(modalSanciones);
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

  openModalSP(sp: any) {
    if (this.modalInstanceSP) {
      this.infoSP = sp;
      this.modalInstanceSP.show();
    }
  }

  closeModalSP() {
    if (this.modalInstanceSP) {
      this.modalInstanceSP.hide();
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
}