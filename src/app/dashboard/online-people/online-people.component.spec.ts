import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePeopleComponent } from './online-people.component';

describe('OnlinePeopleComponent', () => {
  let component: OnlinePeopleComponent;
  let fixture: ComponentFixture<OnlinePeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnlinePeopleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnlinePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
