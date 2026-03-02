import { Component, input, model, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sn-tooltip-cmp',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="sn-tooltip absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-sm whitespace-nowrap pointer-events-none transition-all duration-150 ease-out origin-center"
             [class.opacity-0]="!isVisible()"
             [class.opacity-100]="isVisible()"
             [class.scale-95]="!isVisible()"
             [class.scale-100]="isVisible()">
          {{ text() }}
        </div>
    `
})
export class TooltipComponent {
    text = input<string>('');
    isVisible = model<boolean>(false);
}
