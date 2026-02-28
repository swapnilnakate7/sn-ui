import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

export interface SnTab {
  label: string;
  content: string;
}

@Component({
  selector: 'sn-tabs',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './sn-tabs.html',
  styleUrl: 'sn-tabs.scss',
})
export class SnTabsComponent {
  @Input() tabs: SnTab[] = [];
  @Input() activeIndex: number = 0;
  @Output() tabChange = new EventEmitter<number>();

  selectTab(index: number): void {
    this.activeIndex = index;
    this.tabChange.emit(index);
  }
}
