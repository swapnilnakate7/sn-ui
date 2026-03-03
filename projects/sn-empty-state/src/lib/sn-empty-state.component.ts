import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sn-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-empty-state.component.html',
  styleUrls: ['./sn-empty-state.component.scss'],
})
export class SnEmptyStateComponent {
  /**
   * Title of the empty state.
   */
  @Input() title: string = 'No Data Found';

  /**
   * Description message to explain why the state is empty.
   */
  @Input() description: string = 'There is currently no data to display here.';

  /**
   * Primary action button text. If provided, the button will be rendered.
   */
  @Input() actionText?: string;

  /**
   * Name of an icon to display (rendered as a CSS class or handled by your icon system).
   */
  @Input() iconClass?: string;

  /**
   * Event emitted when the primary action button is clicked.
   */
  @Output() actionClicked = new EventEmitter<void>();

  onActionClick(): void {
    this.actionClicked.emit();
  }
}
