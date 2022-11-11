import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeNewComponent } from './heroe-new.component';

describe('HeroeNewComponent', () => {
  let component: HeroeNewComponent;
  let fixture: ComponentFixture<HeroeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroeNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
