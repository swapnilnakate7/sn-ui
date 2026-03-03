import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SnBreadcrumbItem {
  label: string;
  path?: string;
  disabled?: boolean;
}

@Component({
  selector: 'sn-breadcrumbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-breadcrumbs.component.html',
  styleUrls: ['./sn-breadcrumbs.component.scss'],
})
export class SnBreadcrumbsComponent {
  /**
   * Array of breadcrumb items to display.
   */
  @Input() items: SnBreadcrumbItem[] = [];

  /**
   * Event emitted when a breadcrumb item is clicked. Passes the clicked item.
   */
  @Output() itemClick = new EventEmitter<SnBreadcrumbItem>();

  onItemClick(item: SnBreadcrumbItem, event: Event): void {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    // If there is no custom path or click handler, the host component may handle routing
    this.itemClick.emit(item);
  }
}
