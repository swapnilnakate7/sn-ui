import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnAlertComponent } from './sn-alert.component';

describe('SnAlertComponent', () => {
  let component: SnAlertComponent;
  let fixture: ComponentFixture<SnAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default scheme to "info"', () => {
    expect(component.scheme).toBe('info');
  });

  it('should be visible by default', () => {
    expect(component._visible).toBeTrue();
  });

  it('should hide and emit dismissed when dismiss() is called', () => {
    let emitted = false;
    component.dismissed.subscribe(() => (emitted = true));
    component.dismiss();
    expect(component._visible).toBeFalse();
    expect(emitted).toBeTrue();
  });

  it('should return correct icon for each scheme', () => {
    component.scheme = 'success';
    expect(component.icon).toBe('✓');
    component.scheme = 'danger';
    expect(component.icon).toBe('✗');
    component.scheme = 'warn';
    expect(component.icon).toBe('⚠');
    component.scheme = 'info';
    expect(component.icon).toBe('ℹ');
  });
});
