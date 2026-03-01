import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnSpinnerXComponent } from './sn-spinner-x.component';

describe('SnSpinnerXComponent', () => {
  let component: SnSpinnerXComponent;
  let fixture: ComponentFixture<SnSpinnerXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnSpinnerXComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnSpinnerXComponent);
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
