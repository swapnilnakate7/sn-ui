import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnDropdownXComponent, SelectOption } from './sn-dropdown-x';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SnDropdownXComponent', () => {
  let component: SnDropdownXComponent;
  let fixture: ComponentFixture<SnDropdownXComponent>;
  let triggerElement: DebugElement;

  const mockOptions: SelectOption[] = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
    { label: 'Disabled Option', value: 'opt4', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnDropdownXComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnDropdownXComponent);
    component = fixture.componentInstance;
    component.options = mockOptions;
    fixture.detectChanges();
    triggerElement = fixture.debugElement.query(By.css('.sn-select-trigger'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown on click', () => {
    expect(component.isOpen).toBe(false);

    triggerElement.nativeElement.click();
    fixture.detectChanges();

    expect(component.isOpen).toBe(true);
  });

  it('should select single option', () => {
    const spy = jasmine.createSpy('onChange');
    component.registerOnChange(spy);

    component.selectOption(mockOptions[0]);
    fixture.detectChanges();

    expect(component.selectedValue).toBe('opt1');
    expect(spy).toHaveBeenCalledWith('opt1' as any);
  });

  it('should emit changed event on selection', () => {
    const spy = spyOn(component.changed, 'emit');

    component.selectOption(mockOptions[1]);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('opt2' as any);
  });

  it('should close dropdown after selecting single option', () => {
    component.isOpen = true;
    component.selectOption(mockOptions[0]);
    fixture.detectChanges();

    expect(component.isOpen).toBe(false);
  });

  it('should support multi-select', () => {
    component.multiple = true;
    fixture.detectChanges();

    component.selectOption(mockOptions[0]);
    component.selectOption(mockOptions[1]);
    fixture.detectChanges();

    expect(component.selectedValues).toEqual(['opt1', 'opt2']);
  });

  it('should deselect option in multi-select mode', () => {
    component.multiple = true;
    component.selectedValues = ['opt1', 'opt2'];

    component.selectOption(mockOptions[0]);
    fixture.detectChanges();

    expect(component.selectedValues).toEqual(['opt2']);
  });

  it('should filter options based on search query', () => {
    component.searchable = true;
    component.searchQuery = 'Option 1';
    fixture.detectChanges();

    const filtered = component.filteredOptions;
    expect(filtered.length).toBe(1);
    expect(filtered[0].label).toBe('Option 1');
  });

  it('should clear selection', () => {
    component.selectedValue = 'opt1';
    component.clearSelection();
    fixture.detectChanges();

    expect(component.selectedValue).toBeNull();
  });

  it('should clear multi-select selection', () => {
    component.multiple = true;
    component.selectedValues = ['opt1', 'opt2'];
    component.clearSelection();
    fixture.detectChanges();

    expect(component.selectedValues).toEqual([]);
  });

  it('should update from writeValue', () => {
    component.writeValue('opt2');
    fixture.detectChanges();

    expect(component.selectedValue).toBe('opt2');
  });

  it('should update multi-select from writeValue', () => {
    component.multiple = true;
    component.writeValue(['opt1', 'opt2']);
    fixture.detectChanges();

    expect(component.selectedValues).toEqual(['opt1', 'opt2']);
  });

  it('should handle disabled state', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.disabled).toBe(true);
  });

  it('should display label when provided', () => {
    component.label = 'Select an option';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement).toBeTruthy();
    expect(labelElement.nativeElement.textContent).toContain('Select an option');
  });

  it('should show correct display value', () => {
    component.selectedValue = 'opt1';
    fixture.detectChanges();

    expect(component.displayValue).toBe('Option 1');
  });

  it('should show placeholder when nothing selected', () => {
    component.placeholder = 'Choose...';
    fixture.detectChanges();

    expect(component.displayValue).toBe('Choose...');
  });

  it('should not select disabled option', () => {
    const disabledOption = mockOptions[3];
    const initialValue = component.selectedValue;

    component.selectOption(disabledOption);
    fixture.detectChanges();

    expect(component.selectedValue).toBe(initialValue);
  });

  it('should close dropdown on outside click', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const outsideEvent = new MouseEvent('click');
    component.onDocumentClick(outsideEvent);
    fixture.detectChanges();

    expect(component.isOpen).toBe(false);
  });

  it('should check if option is selected', () => {
    component.selectedValue = 'opt1';

    expect(component.isSelected(mockOptions[0])).toBe(true);
    expect(component.isSelected(mockOptions[1])).toBe(false);
  });

  it('should show selected count in multi-select mode', () => {
    component.multiple = true;
    component.selectedValues = ['opt1', 'opt2'];
    fixture.detectChanges();

    expect(component.displayValue).toBe('2 selected');
  });
});
