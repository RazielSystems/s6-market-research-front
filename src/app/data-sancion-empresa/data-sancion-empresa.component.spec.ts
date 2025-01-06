import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSancionEmpresaComponent } from './data-sancion-empresa.component';

describe('DataSancionEmpresaComponent', () => {
  let component: DataSancionEmpresaComponent;
  let fixture: ComponentFixture<DataSancionEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataSancionEmpresaComponent]
    });
    fixture = TestBed.createComponent(DataSancionEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
