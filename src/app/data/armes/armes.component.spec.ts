import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmesComponent } from './armes.component';

describe('ArmesComponent', () => {
  let component: ArmesComponent;
  let fixture: ComponentFixture<ArmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
