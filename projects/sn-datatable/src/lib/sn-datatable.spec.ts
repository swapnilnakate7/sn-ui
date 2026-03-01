import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnDatatableComponent, TableColumn, TableRow } from './sn-datatable';

describe('SnDatatableComponent', () => {
  let component: SnDatatableComponent;
  let fixture: ComponentFixture<SnDatatableComponent>;

  const mockColumns: TableColumn[] = [
    { header: 'ID', key: 'id', sortable: true },
    { header: 'Name', key: 'name', sortable: true },
    { header: 'Email', key: 'email', sortable: true },
    { header: 'Status', key: 'status', sortable: false },
  ];

  const mockData: TableRow[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', status: 'Active' },
    { id: 2, name: 'Bob', email: 'bob@example.com', status: 'Inactive' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'Active' },
    { id: 4, name: 'David', email: 'david@example.com', status: 'Active' },
    { id: 5, name: 'Eve', email: 'eve@example.com', status: 'Inactive' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnDatatableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SnDatatableComponent);
    component = fixture.componentInstance;
    component.columns = mockColumns;
    component.data = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all data on first page', () => {
    expect(component.paginatedData.length).toBe(5);
  });

  it('should sort data in ascending order', () => {
    component.sort('name');
    fixture.detectChanges();
    expect(component.sortedData[0]['name']).toBe('Alice');
    expect(component.sortDirection).toBe('asc');
  });

  it('should sort data in descending order on second click', () => {
    component.sort('name');
    component.sort('name');
    fixture.detectChanges();
    expect(component.sortedData[0]['name']).toBe('Eve');
    expect(component.sortDirection).toBe('desc');
  });

  it('should emit sorted event', () => {
    const spy = spyOn(component.sorted, 'emit');
    component.sort('email');
    expect(spy).toHaveBeenCalledWith({ column: 'email', direction: 'asc' });
  });

  it('should not sort non-sortable columns', () => {
    component.sort('status');
    expect(component.sortColumn).toBeNull();
  });

  it('should handle pagination correctly', () => {
    component.pageSize = 2;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.totalPages).toBe(3);
    expect(component.paginatedData.length).toBe(2);
  });

  it('should navigate to next page', () => {
    component.pageSize = 2;
    component.ngOnInit();
    component.nextPage();
    expect(component.currentPage).toBe(2);
  });

  it('should navigate to previous page', () => {
    component.pageSize = 2;
    component.ngOnInit();
    component.currentPage = 2;
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should not go beyond last page', () => {
    component.pageSize = 2;
    component.ngOnInit();
    component.goToPage(10);
    expect(component.currentPage).toBe(1);
  });

  it('should display correct sort icon', () => {
    component.sort('name');
    expect(component.getSortIcon('name')).toBe('↑');
    component.sort('name');
    expect(component.getSortIcon('name')).toBe('↓');
    expect(component.getSortIcon('email')).toBe('↕');
  });

  it('should handle empty data', () => {
    component.data = [];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.paginatedData.length).toBe(0);
  });

  it('should sort numbers correctly', () => {
    component.sort('id');
    fixture.detectChanges();
    expect(component.sortedData[0]['id']).toBe(1);
  });

  it('should apply striped style', () => {
    component.striped = true;
    fixture.detectChanges();
    expect(component.striped).toBe(true);
  });

  it('should apply hoverable style', () => {
    component.hoverable = true;
    fixture.detectChanges();
    expect(component.hoverable).toBe(true);
  });

  it('should apply bordered style', () => {
    component.bordered = true;
    fixture.detectChanges();
    expect(component.bordered).toBe(true);
  });
});

