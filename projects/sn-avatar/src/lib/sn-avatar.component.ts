import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SnAvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type SnAvatarShape = 'circle' | 'square' | 'rounded';

@Component({
  selector: 'sn-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sn-avatar.component.html',
  styleUrls: ['./sn-avatar.component.scss'],
})
export class SnAvatarComponent implements OnChanges {
  /**
   * The URL of the image to display.
   */
  @Input() src?: string;

  /**
   * Alt text for the image.
   */
  @Input() alt = 'Avatar';

  /**
   * Text to display as initials when `src` is not provided or fails to load.
   */
  @Input() initials?: string;

  /**
   * Background color applied when displaying initials (useful for distinct random colors per user).
   */
  @Input() bgColor?: string;

  /**
   * Text color applied when displaying initials.
   */
  @Input() textColor?: string;

  /**
   * The size of the avatar.
   * Options: 'sm', 'md', 'lg', 'xl'
   */
  @Input() size: SnAvatarSize = 'md';

  /**
   * The shape of the avatar.
   * Options: 'circle', 'square', 'rounded'
   */
  @Input() shape: SnAvatarShape = 'circle';

  imageError = false;
  computedInitials = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      // Reset error state if the src changes
      this.imageError = false;
    }

    if (changes['initials'] && this.initials) {
      this.computedInitials = this.calculateInitials(this.initials);
    }
  }

  onImageError(): void {
    this.imageError = true;
  }

  get showImage(): boolean {
    return !!this.src && !this.imageError;
  }

  get wrapperClasses(): { [key: string]: boolean } {
    return {
      'sn-avatar': true,
      [`sn-avatar-${this.size}`]: true,
      [`sn-avatar-${this.shape}`]: true,
    };
  }

  get wrapperStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    if (!this.showImage) {
      if (this.bgColor) styles['background-color'] = this.bgColor;
      if (this.textColor) styles['color'] = this.textColor;
    }
    return styles;
  }

  /**
   * Helper to compute short initials from a full name.
   */
  private calculateInitials(text: string): string {
    const parts = text.trim().split(/\s+/);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
}
