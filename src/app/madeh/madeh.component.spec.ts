import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadehComponent } from './madeh.component';

describe('MadehComponent', () => {
  let component: MadehComponent;
  let fixture: ComponentFixture<MadehComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadehComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MadehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
