import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnButtonComponent } from '@libs/sn-button-x/src/public-api';
import { SnCardComponent } from '@libs/sn-card/src/public-api';
import { SnInputComponent } from '@libs/sn-input/src/public-api';
import { SnBadgeComponent } from '@libs/sn-badge/src/public-api';
import { SnAlertComponent } from '@libs/sn-alert/src/public-api';
import { SnSpinnerComponent } from '@libs/sn-spinner/src/public-api';
import { SnModalComponent } from '@libs/sn-modal/src/public-api';
import { SnTabsComponent, SnTab } from '@libs/sn-tabs/src/public-api';
import { SnToggleComponent } from '@libs/sn-toggle/src/public-api';

@Component({
  selector: 'sn-list',
  standalone: true,
  imports: [CommonModule, SnButtonComponent, SnCardComponent, SnInputComponent,
    SnBadgeComponent, SnAlertComponent, SnSpinnerComponent, SnModalComponent,
    SnTabsComponent, SnToggleComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  list = ['button', 'card', 'input', 'badge', 'alert', 'spinner', 'modal', 'tabs', 'toggle'];
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
}
