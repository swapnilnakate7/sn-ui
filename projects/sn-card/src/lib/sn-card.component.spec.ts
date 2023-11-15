import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnCardComponent } from './sn-card.component';

describe('SnCardComponent', () => {
  let component: SnCardComponent;
  let fixture: ComponentFixture<SnCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
