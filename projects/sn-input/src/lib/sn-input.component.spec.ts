import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnInputComponent } from './sn-input.component';

describe('SnInputComponent', () => {
  let component: SnInputComponent;
  let fixture: ComponentFixture<SnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
