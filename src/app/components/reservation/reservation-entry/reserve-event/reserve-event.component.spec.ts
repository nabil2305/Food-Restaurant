import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveEventComponent } from './reserve-event.component';

describe('ReserveEventComponent', () => {
  let component: ReserveEventComponent;
  let fixture: ComponentFixture<ReserveEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
