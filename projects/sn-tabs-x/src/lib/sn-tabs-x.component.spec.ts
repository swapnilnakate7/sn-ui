import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnTabsXComponent } from './sn-tabs-x.component';

describe('SnTabsXComponent', () => {
  let component: SnTabsXComponent;
  let fixture: ComponentFixture<SnTabsXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnTabsXComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnTabsXComponent);
    component = fixture.componentInstance;
    component.tabs = [
      { label: 'Tab 1', content: 'Content 1' },
      { label: 'Tab 2', content: 'Content 2' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default activeIndex to 0', () => {
    expect(component.activeIndex).toBe(0);
  });

  it('should update activeIndex and emit tabChange when selectTab is called', () => {
    let emittedIndex = -1;
    component.tabChange.subscribe((i: number) => (emittedIndex = i));
    component.selectTab(1);
    expect(component.activeIndex).toBe(1);
    expect(emittedIndex).toBe(1);
  });
});
