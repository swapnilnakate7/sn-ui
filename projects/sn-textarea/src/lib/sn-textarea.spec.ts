import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnTextareaComponent } from './sn-textarea';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SnTextareaComponent', () => {
  let component: SnTextareaComponent;
  let fixture: ComponentFixture<SnTextareaComponent>;
  let textareaElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    textareaElement = fixture.debugElement.query(By.css('textarea'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value on input', () => {
    const spy = jasmine.createSpy('onChange');
    component.registerOnChange(spy);

    const event = new Event('input');
    textareaElement.nativeElement.value = 'test input';
    textareaElement.nativeElement.dispatchEvent(event);
    component.onTextareaChange(event);
    fixture.detectChanges();

    expect(component.value).toBe('test input');
    expect(spy).toHaveBeenCalledWith('test input');
  });

  it('should emit changed event on input', () => {
    const spy = spyOn(component.changed, 'emit');

    const event = new Event('input');
    textareaElement.nativeElement.value = 'test';
    textareaElement.nativeElement.dispatchEvent(event);
    component.onTextareaChange(event);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('test');
  });

  it('should update character count', () => {
    const event = new Event('input');
    textareaElement.nativeElement.value = 'hello';
    textareaElement.nativeElement.dispatchEvent(event);
    component.onTextareaChange(event);
    fixture.detectChanges();

    expect(component.characterCount).toBe(5);
  });

  it('should update value from writeValue', () => {
    component.writeValue('test value');
    fixture.detectChanges();

    expect(component.value).toBe('test value');
    expect(component.characterCount).toBe(10);
  });

  it('should handle disabled state', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.disabled).toBe(true);
    expect(textareaElement.nativeElement.disabled).toBe(true);
  });

  it('should display label when provided', () => {
    component.label = 'Comments';
    component.id = 'comments';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement).toBeTruthy();
    expect(labelElement.nativeElement.textContent).toContain('Comments');
    expect(labelElement.nativeElement.getAttribute('for')).toBe('comments');
  });

  it('should set placeholder attribute', () => {
    component.placeholder = 'Enter your message';
    fixture.detectChanges();

    expect(textareaElement.nativeElement.getAttribute('placeholder')).toBe('Enter your message');
  });

  it('should set maxlength attribute', () => {
    component.maxLength = 100;
    fixture.detectChanges();

    expect(textareaElement.nativeElement.getAttribute('maxlength')).toBe('100');
  });

  it('should display character counter when maxLength is set', () => {
    component.maxLength = 50;
    component.value = 'test';
    component.characterCount = 4;
    fixture.detectChanges();

    const counter = fixture.debugElement.query(By.css('.sn-textarea-counter'));
    expect(counter).toBeTruthy();
    expect(counter.nativeElement.textContent).toContain('4 / 50');
  });

  it('should call onTouched on blur', () => {
    const spy = jasmine.createSpy('onTouched');
    component.registerOnTouched(spy);

    textareaElement.nativeElement.dispatchEvent(new Event('blur'));
    component.onBlur();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should set rows attribute', () => {
    component.rows = 6;
    fixture.detectChanges();

    expect(textareaElement.nativeElement.getAttribute('rows')).toBe('6');
  });

  it('should handle readonly state', () => {
    component.readonly = true;
    fixture.detectChanges();

    expect(textareaElement.nativeElement.readOnly).toBe(true);
  });

  it('should handle null maxLength', () => {
    component.maxLength = null;
    fixture.detectChanges();

    expect(textareaElement.nativeElement.getAttribute('maxlength')).toBeNull();
  });
});
