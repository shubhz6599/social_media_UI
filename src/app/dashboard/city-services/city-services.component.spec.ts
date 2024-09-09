import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityServicesComponent } from './city-services.component';

describe('CityServicesComponent', () => {
  let component: CityServicesComponent;
  let fixture: ComponentFixture<CityServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
