import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataServidorPublicoComponent } from './data-servidor-publico/data-servidor-publico.component';
import { DataSancionEmpresaComponent } from './data-sancion-empresa/data-sancion-empresa.component';
import { DataEfosComponent } from './data-efos/data-efos.component';

@NgModule({
  declarations: [AppComponent, DataServidorPublicoComponent, DataSancionEmpresaComponent, DataEfosComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
