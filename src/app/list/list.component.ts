import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SnButtonComponent } from '@libs/sn-button-x/src/public-api';
import { SnCardComponent } from '@libs/sn-card/src/public-api';
import { SnInputComponent } from '@libs/sn-input/src/public-api';
import { SnBadgeComponent } from '@libs/sn-badge/src/public-api';
import { SnAlertComponent } from '@libs/sn-alert/src/public-api';
import { SnModalComponent } from '@libs/sn-modal/src/public-api';
import { SnToggleComponent } from '@libs/sn-toggle/src/public-api';
import { SnCheckboxXComponent } from '../../../projects/sn-checkbox-x/src/public-api';
import { SnRadioComponent } from '../../../projects/sn-radio/src/public-api';
import { SnTextareaComponent } from '../../../projects/sn-textarea/src/public-api';
import {SnDatatableComponent, TableColumn, TableRow} from "@libs/sn-datatable/src/lib/sn-datatable";
import {SelectOption, SnDropdownXComponent} from "@libs/sn-dropdown-x/src/lib/sn-dropdown-x";
import {SnTab, SnTabsXComponent} from "@libs/sn-tabs-x/src/lib/sn-tabs-x.component";
import {SnSpinnerXComponent} from "@libs/sn-spinner-x/src/lib/sn-spinner-x.component";

@Component({
  selector: 'sn-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SnButtonComponent, SnCardComponent, SnInputComponent,
    SnBadgeComponent, SnAlertComponent, SnSpinnerXComponent, SnModalComponent,
    SnTabsXComponent, SnToggleComponent, SnCheckboxXComponent, SnRadioComponent,
    SnTextareaComponent, SnDropdownXComponent, SnDatatableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  list = ['button', 'card', 'input', 'badge', 'alert', 'spinner', 'modal', 'tabs', 'toggle', 'checkbox', 'radio', 'textarea', 'dropdown', 'datatable'];
  @Input('componentName') _display = '';
  display(componentName: string) {
    this._display = componentName;
  }
  sayHello(evt:any){
    console.log('Hello',evt);
  }

  // Modal demo state
  _modalOpen = false;
  openModal() { this._modalOpen = true; }
  onModalClosed() { this._modalOpen = false; }

  // Tabs demo data
  demoTabs: SnTab[] = [
    { label: 'Tab One', content: 'Content for Tab One: This is the first tab panel.' },
    { label: 'Tab Two', content: 'Content for Tab Two: Here is some different content.' },
    { label: 'Tab Three', content: 'Content for Tab Three: And a third tab for good measure.' },
  ];

  // Toggle demo state
  _toggle1 = false;
  _toggle2 = true;

  // Checkbox demo state
  checkboxValue = false;
  agreeTerms = false;
  selectAll = false;
  indeterminateState = false;
  disabledCheckedValue = true;

  // Radio demo state
  selectedGender = 'male';
  selectedSize = 'medium';

  // Textarea demo state
  comments = '';
  feedback = '';
  readonlyText = 'This text is readonly and cannot be edited';

  // Select demo state
  selectedCountry: string | null = null;
  selectedLanguages: string[] = [];

  countries: SelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'India', value: 'in' },
  ];

  languages: SelectOption[] = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Python', value: 'py' },
    { label: 'Java', value: 'java' },
    { label: 'C#', value: 'csharp' },
    { label: 'Ruby', value: 'ruby' },
  ];

  // Table demo data
  tableColumns: TableColumn[] = [
    { header: 'ID', key: 'id', sortable: true, width: '80px', align: 'center' },
    { header: 'Name', key: 'name', sortable: true, width: '200px', align: 'left' },
    { header: 'Email', key: 'email', sortable: true, width: '250px', align: 'left' },
    { header: 'Department', key: 'department', sortable: true, width: '150px', align: 'left' },
    { header: 'Status', key: 'status', sortable: false, width: '120px', align: 'center' },
  ];

  tableData: TableRow[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice.johnson@company.com', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob.smith@company.com', department: 'Marketing', status: 'Active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.brown@company.com', department: 'Engineering', status: 'Inactive' },
    { id: 4, name: 'Diana Prince', email: 'diana.prince@company.com', department: 'Sales', status: 'Active' },
    { id: 5, name: 'Eve Wilson', email: 'eve.wilson@company.com', department: 'HR', status: 'Active' },
    { id: 6, name: 'Frank Miller', email: 'frank.miller@company.com', department: 'Engineering', status: 'Active' },
    { id: 7, name: 'Grace Lee', email: 'grace.lee@company.com', department: 'Finance', status: 'Inactive' },
    { id: 8, name: 'Henry Taylor', email: 'henry.taylor@company.com', department: 'Marketing', status: 'Active' },
    { id: 9, name: 'Iris Davis', email: 'iris.davis@company.com', department: 'Engineering', status: 'Active' },
    { id: 10, name: 'Jack Anderson', email: 'jack.anderson@company.com', department: 'Sales', status: 'Active' },
    { id: 11, name: 'Karen White', email: 'karen.white@company.com', department: 'HR', status: 'Inactive' },
    { id: 12, name: 'Leo Harris', email: 'leo.harris@company.com', department: 'Engineering', status: 'Active' },
  ];

  onCheckboxChange(value: boolean) {
    console.log('Checkbox changed:', value);
  }

  onRadioChange(value: string) {
    console.log('Radio changed:', value);
  }

  onTextareaChange(value: string) {
    console.log('Textarea changed:', value);
  }

  onSelectChange(value: any) {
    console.log('Select changed:', value);
  }

  onTableSorted(event: any) {
    console.log('Table sorted:', event);
  }
}
