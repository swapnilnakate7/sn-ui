import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SnTab {
  label: string;
  content: string;
}

@Component({
  selector: 'sn-tabs-x',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-tabs-x.html',
  styleUrl: 'sn-tabs-x.scss',
})
export class SnTabsXComponent {
  @Input() tabs: SnTab[] = [];
  @Input() activeIndex: number = 0;
  @Output() tabChange = new EventEmitter<number>();

  selectTab(index: number): void {
    this.activeIndex = index;
    this.tabChange.emit(index);
  }
}
