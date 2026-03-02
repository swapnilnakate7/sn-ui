import {
    Directive,
    ElementRef,
    ComponentRef,
    OnDestroy,
    PLATFORM_ID,
    inject,
    input,
    ApplicationRef,
    EnvironmentInjector,
    createComponent
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TooltipComponent } from './tooltip.component';

@Directive({
    selector: '[snTooltip]',
    standalone: true,
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})
export class TooltipDirective implements OnDestroy {
    snTooltip = input<string>('', { alias: 'snTooltip' });
    tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');
    tooltipDelay = input<number>(200);

    private elementRef = inject(ElementRef);
    private platformId = inject(PLATFORM_ID);
    private appRef = inject(ApplicationRef);
    private environmentInjector = inject(EnvironmentInjector);
    private isBrowser = isPlatformBrowser(this.platformId);

    private componentRef: ComponentRef<TooltipComponent> | null = null;
    private timeoutId: any;

    onMouseEnter() {
        if (!this.isBrowser || !this.snTooltip()) return;
        this.timeoutId = setTimeout(() => {
            this.show();
        }, this.tooltipDelay());
    }

    onMouseLeave() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.hide();
    }

    private show() {
        if (this.componentRef) return;

        // Modern dynamic component creation attached directly to environment
        this.componentRef = createComponent(TooltipComponent, {
            environmentInjector: this.environmentInjector
        });

        // Use setInput which handles component updates appropriately
        this.componentRef.setInput('text', this.snTooltip());
        this.componentRef.instance.isVisible.set(true);

        this.appRef.attachView(this.componentRef.hostView);

        const hostDomElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
        document.body.appendChild(hostDomElem);

        // Force synchronous render of @if content
        this.componentRef.changeDetectorRef.detectChanges();

        this.setPosition(hostDomElem);
    }

    private setPosition(hostDomElem: HTMLElement) {
        if (!this.componentRef) return;

        const hostEl = this.elementRef.nativeElement;
        const tooltipEl = hostDomElem.querySelector('.sn-tooltip') as HTMLElement;

        if (!tooltipEl) return;

        const hostRect = hostEl.getBoundingClientRect();
        const tooltipRect = tooltipEl.getBoundingClientRect();

        let top, left;
        const offset = 8;

        const position = this.tooltipPosition();

        switch (position) {
            case 'top':
                top = hostRect.top - tooltipRect.height - offset;
                left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = hostRect.bottom + offset;
                left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
                left = hostRect.left - tooltipRect.width - offset;
                break;
            case 'right':
                top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
                left = hostRect.right + offset;
                break;
        }

        if (top < 0) top = offset;
        if (left < 0) left = offset;

        tooltipEl.style.top = `${top + window.scrollY}px`;
        tooltipEl.style.left = `${left + window.scrollX}px`;
    }

    public hide() {
        if (this.componentRef) {
            this.componentRef.instance.isVisible.set(false);
            this.componentRef.changeDetectorRef.detectChanges();

            const currentRef = this.componentRef;
            this.componentRef = null;

            setTimeout(() => {
                this.appRef.detachView(currentRef.hostView);
                currentRef.destroy();
            }, 150);
        }
    }

    ngOnDestroy() {
        this.hide();
    }
}
