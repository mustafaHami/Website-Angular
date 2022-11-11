import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmeNewComponent } from './arme-new.component';

describe('ArmeNewComponent', () => {
  let component: ArmeNewComponent;
  let fixture: ComponentFixture<ArmeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmeNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
