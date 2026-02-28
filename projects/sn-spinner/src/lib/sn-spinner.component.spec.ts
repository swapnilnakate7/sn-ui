import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnSpinnerComponent } from './sn-spinner.component';

describe('SnSpinnerComponent', () => {
  let component: SnSpinnerComponent;
  let fixture: ComponentFixture<SnSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default scheme to "primary"', () => {
    expect(component.scheme).toBe('primary');
  });

  it('should default size to "md"', () => {
    expect(component.size).toBe('md');
  });

  it('should default label to "Loading..."', () => {
    expect(component.label).toBe('Loading...');
  });
});
