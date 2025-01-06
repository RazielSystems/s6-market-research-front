import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEfosComponent } from './data-efos.component';

describe('DataEfosComponent', () => {
  let component: DataEfosComponent;
  let fixture: ComponentFixture<DataEfosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataEfosComponent]
    });
    fixture = TestBed.createComponent(DataEfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
