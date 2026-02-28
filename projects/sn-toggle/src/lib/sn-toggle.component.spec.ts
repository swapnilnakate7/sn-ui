import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnToggleComponent } from './sn-toggle.component';

describe('SnToggleComponent', () => {
  let component: SnToggleComponent;
  let fixture: ComponentFixture<SnToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default checked to false', () => {
    expect(component.checked).toBeFalse();
  });

  it('should default disabled to false', () => {
    expect(component.disabled).toBeFalse();
  });

  it('should default scheme to "primary"', () => {
    expect(component.scheme).toBe('primary');
  });

  it('should emit toggled with new value when onChange is called', () => {
    let emittedValue: boolean | undefined;
    component.toggled.subscribe((v: boolean) => (emittedValue = v));
    const mockEvent = { target: { checked: true } } as unknown as Event;
    component.onChange(mockEvent);
    expect(component.checked).toBeTrue();
    expect(emittedValue).toBeTrue();
  });
});
