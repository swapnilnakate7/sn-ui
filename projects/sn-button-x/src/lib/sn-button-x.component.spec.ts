import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnButtonComponent } from './sn-button-x.component';

describe('SnButtonComponent', () => {
  let component: SnButtonComponent;
  let fixture: ComponentFixture<SnButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
