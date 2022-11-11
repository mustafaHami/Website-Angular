import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmeDetailComponent } from './arme-detail.component';

describe('ArmeDetailComponent', () => {
  let component: ArmeDetailComponent;
  let fixture: ComponentFixture<ArmeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
