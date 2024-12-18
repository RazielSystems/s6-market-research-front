import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataServidorPublicoComponent } from './data-servidor-publico.component';

describe('DataServidorPublicoComponent', () => {
  let component: DataServidorPublicoComponent;
  let fixture: ComponentFixture<DataServidorPublicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataServidorPublicoComponent]
    });
    fixture = TestBed.createComponent(DataServidorPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
