import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArmesComponent } from './list-armes.component';

describe('ListArmesComponent', () => {
  let component: ListArmesComponent;
  let fixture: ComponentFixture<ListArmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArmesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
