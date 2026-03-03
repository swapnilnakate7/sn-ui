import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SnProgressBarSize = 'sm' | 'md' | 'lg';
export type SnProgressBarTheme = 'primary' | 'success' | 'warn' | 'danger' | 'info';

@Component({
  selector: 'sn-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-progress-bar.component.html',
  styleUrls: ['./sn-progress-bar.component.scss'],
})
export class SnProgressBarComponent implements OnChanges {
  /**
   * Current progress value (typically 0-100).
   */
  @Input() value: number = 0;

  /**
   * Maximum value for the progress bar.
   */
  @Input() max: number = 100;

  /**
   * Indicates if the progress state is unknown (animates infinitely).
   */
  @Input() indeterminate: boolean = false;

  /**
   * Size of the progress bar track.
   */
  @Input() size: SnProgressBarSize = 'md';

  /**
   * Visual theme color.
   */
  @Input() theme: SnProgressBarTheme = 'primary';

  /**
   * Whether to show the percentage label inside or outside the bar.
   */
  @Input() showLabel: boolean = false;

  /**
   * Custom text to prepend to the label (e.g. "Uploading...").
   */
  @Input() labelText: string = '';

  percent: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['max']) {
      this.calculatePercent();
    }
  }

  private calculatePercent(): void {
    if (this.max <= 0) {
      this.percent = 0;
      return;
    }
    const ratio = Math.max(0, Math.min(this.value, this.max)) / this.max;
    // ensure exactly 1 decimal point if not a whole number
    const calculated = ratio * 100;
    this.percent = calculated % 1 === 0 ? calculated : Number(calculated.toFixed(1));
  }
}
