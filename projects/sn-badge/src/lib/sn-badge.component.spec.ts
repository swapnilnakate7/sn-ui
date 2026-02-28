import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnBadgeComponent } from './sn-badge.component';

describe('SnBadgeComponent', () => {
  let component: SnBadgeComponent;
  let fixture: ComponentFixture<SnBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default scheme to "default"', () => {
    expect(component.scheme).toBe('default');
  });

  it('should default size to "md"', () => {
    expect(component.size).toBe('md');
  });

  it('should default pill to false', () => {
    expect(component.pill).toBeFalse();
  });
});
