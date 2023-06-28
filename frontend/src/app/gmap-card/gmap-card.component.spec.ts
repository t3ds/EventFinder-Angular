import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapCardComponent } from './gmap-card.component';

describe('GmapCardComponent', () => {
  let component: GmapCardComponent;
  let fixture: ComponentFixture<GmapCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmapCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GmapCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
