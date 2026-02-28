import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnModalComponent } from './sn-modal.component';

describe('SnModalComponent', () => {
  let component: SnModalComponent;
  let fixture: ComponentFixture<SnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default open to false', () => {
    expect(component.open).toBeFalse();
  });

  it('should default size to "md"', () => {
    expect(component.size).toBe('md');
  });

  it('should default closeOnBackdrop to true', () => {
    expect(component.closeOnBackdrop).toBeTrue();
  });

  it('should emit closed and set open to false when close() is called', () => {
    component.open = true;
    let emitted = false;
    component.closed.subscribe(() => (emitted = true));
    component.close();
    expect(component.open).toBeFalse();
    expect(emitted).toBeTrue();
  });

  it('should close on backdrop click when closeOnBackdrop is true', () => {
    component.open = true;
    component.closeOnBackdrop = true;
    component.onBackdropClick();
    expect(component.open).toBeFalse();
  });

  it('should not close on backdrop click when closeOnBackdrop is false', () => {
    component.open = true;
    component.closeOnBackdrop = false;
    component.onBackdropClick();
    expect(component.open).toBeTrue();
  });
});
