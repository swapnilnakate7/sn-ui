import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SnSkeletonType = 'text' | 'circle' | 'rectangle';
export type SnSkeletonAnimation = 'pulse' | 'wave' | 'none';

@Component({
  selector: 'sn-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-skeleton.component.html',
  styleUrls: ['./sn-skeleton.component.scss'],
})
export class SnSkeletonComponent {
  /**
   * Shape or type of the skeleton component.
   * Options: 'text', 'circle', 'rectangle'
   */
  @Input() type: SnSkeletonType = 'text';

  /**
   * Animation effect applied to the skeleton.
   * Options: 'pulse', 'wave', 'none'
   */
  @Input() animation: SnSkeletonAnimation = 'pulse';

  /**
   * Width of the skeleton component.
   * Accepts any valid CSS width value (e.g. '100%', '50px', '2rem').
   */
  @Input() width: string = '100%';

  /**
   * Height of the skeleton component.
   * Accepts any valid CSS height value (e.g. '1rem', '50px').
   * If not provided, height falls back to CSS rules based on the type.
   */
  @Input() height?: string;

  /**
   * Custom CSS classes to apply to the skeleton container.
   */
  @Input() customClass: string = '';

  get skeletonClasses(): string {
    const classes = [
      'sn-skeleton',
      `sn-skeleton-${this.type}`,
      `sn-skeleton-anim-${this.animation}`
    ];
    if (this.customClass) {
      classes.push(this.customClass);
    }
    return classes.join(' ');
  }

  get skeletonStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {
      width: this.width
    };
    if (this.height) {
      styles['height'] = this.height;
    }
    return styles;
  }
}
