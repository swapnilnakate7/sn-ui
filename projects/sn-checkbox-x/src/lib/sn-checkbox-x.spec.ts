import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnCheckboxXComponent } from './sn-checkbox-x';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SnCheckboxXComponent', () => {
  let component: SnCheckboxXComponent;
  let fixture: ComponentFixture<SnCheckboxXComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnCheckboxXComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnCheckboxXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle checkbox value on change', () => {
    const spy = jasmine.createSpy('onChange');
    component.registerOnChange(spy);

    inputElement.nativeElement.click();
    fixture.detectChanges();

    expect(component.checked).toBe(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should emit changed event on checkbox change', () => {
    const spy = spyOn(component.changed, 'emit');

    inputElement.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should update checked value from writeValue', () => {
    component.writeValue(true);
    fixture.detectChanges();

    expect(component.checked).toBe(true);
  });

  it('should handle disabled state', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.disabled).toBe(true);
    expect(inputElement.nativeElement.disabled).toBe(true);
  });

  it('should set indeterminate state', () => {
    component.indeterminate = true;
    fixture.detectChanges();

    expect(inputElement.nativeElement.indeterminate).toBe(true);
  });

  it('should clear indeterminate state on checkbox change', () => {
    component.indeterminate = true;
    inputElement.nativeElement.click();
    fixture.detectChanges();

    expect(component.indeterminate).toBe(false);
  });

  it('should display label when provided', () => {
    component.label = 'Accept Terms';
    component.id = 'accept-terms';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement).toBeTruthy();
    expect(labelElement.nativeElement.textContent).toContain('Accept Terms');
    expect(labelElement.nativeElement.getAttribute('for')).toBe('accept-terms');
  });

  it('should call onTouched on blur', () => {
    const spy = jasmine.createSpy('onTouched');
    component.registerOnTouched(spy);

    inputElement.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
