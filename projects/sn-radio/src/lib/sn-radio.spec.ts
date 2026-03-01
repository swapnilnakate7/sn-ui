t
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnRadioComponent } from './sn-radio';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SnRadioComponent', () => {
  let component: SnRadioComponent;
  let fixture: ComponentFixture<SnRadioComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnRadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnRadioComponent);
    component = fixture.componentInstance;
    component.value = 'option1';
    fixture.detectChanges();
    inputElement = fixture.debugElement.query(By.css('input[type="radio"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle radio value on change', () => {
    const spy = jasmine.createSpy('onChange');
    component.registerOnChange(spy);
    component.value = 'test-value';

    inputElement.nativeElement.click();
    fixture.detectChanges();

    expect(component.checked).toBe(true);
    expect(spy).toHaveBeenCalledWith('test-value');
  });

  it('should emit changed event on radio change', () => {
    const spy = spyOn(component.changed, 'emit');
    component.value = 'test-value';

    inputElement.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('test-value');
  });

  it('should update checked value from writeValue', () => {
    component.value = 'option1';
    component.writeValue('option1');
    fixture.detectChanges();

    expect(component.checked).toBe(true);
  });

  it('should uncheck when writeValue is called with different value', () => {
    component.value = 'option1';
    component.writeValue('option2');
    fixture.detectChanges();

    expect(component.checked).toBe(false);
  });

  it('should handle disabled state', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.disabled).toBe(true);
    expect(inputElement.nativeElement.disabled).toBe(true);
  });

  it('should display label when provided', () => {
    component.label = 'Option 1';
    component.id = 'radio-option-1';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement).toBeTruthy();
    expect(labelElement.nativeElement.textContent).toContain('Option 1');
    expect(labelElement.nativeElement.getAttribute('for')).toBe('radio-option-1');
  });

  it('should call onTouched on blur', () => {
    const spy = jasmine.createSpy('onTouched');
    component.registerOnTouched(spy);

    inputElement.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should set correct name attribute', () => {
    component.name = 'gender';
    fixture.detectChanges();

    expect(inputElement.nativeElement.getAttribute('name')).toBe('gender');
  });

  it('should only check when clicked', () => {
    component.checked = false;
    inputElement.nativeElement.checked = false;

    inputElement.nativeElement.click();
    const event = new Event('change');
    inputElement.nativeElement.dispatchEvent(event);
    component.onRadioChange(event);
    fixture.detectChanges();

    expect(component.checked).toBe(true);
  });
});
