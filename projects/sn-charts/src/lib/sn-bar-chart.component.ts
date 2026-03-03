import { Component, Input, OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SnBarChartData {
    label: string;
    value: number;
}

@Component({
    selector: 'sn-bar-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sn-bar-chart.component.html',
    styleUrls: ['./sn-bar-chart.component.scss'],
})
export class SnBarChartComponent implements OnChanges {
    /**
     * Array of data points to render.
     */
    @Input() data: SnBarChartData[] = [];

    /**
     * Primary color for the bars.
     */
    @Input() color: string = '#4f46e5';

    /**
     * Height of the SVG visualization (width is generally responsive 100%).
     */
    @Input() height: number = 300;

    width: number = 600; // Will be calculated actively via ResizeObserver or container width
    padding: number = 40;

    maxValue: number = 0;
    chartWidth: number = 0;
    chartHeight: number = 0;

    hoveredIndex: number | null = null;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.updateDimensions();
    }

    @HostListener('window:resize')
    onResize() {
        this.updateDimensions();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] || changes['height']) {
            this.updateChart();
        }
    }

    ngAfterViewInit() {
        // Initial calculation based on actual container bounds
        setTimeout(() => this.updateDimensions(), 0);
    }

    updateDimensions() {
        if (this.el.nativeElement) {
            const parentWidth = this.el.nativeElement.parentElement?.clientWidth;
            if (parentWidth && parentWidth > 0) {
                this.width = parentWidth;
            }
            this.updateChart();
        }
    }

    updateChart(): void {
        const maxDataVal = Math.max(...this.data.map(d => d.value), 0);
        // Add 10% headroom to the top of the chart
        this.maxValue = maxDataVal > 0 ? maxDataVal * 1.1 : 10;

        // Calculate usable graphing area
        this.chartWidth = Math.max(0, this.width - this.padding * 2);
        this.chartHeight = Math.max(0, this.height - this.padding * 2);
    }

    getBarHeight(value: number): number {
        if (this.maxValue === 0) return 0;
        return (value / this.maxValue) * this.chartHeight;
    }

    getBarY(value: number): number {
        return this.height - this.padding - this.getBarHeight(value);
    }

    getBarX(index: number): number {
        if (this.data.length === 0) return 0;
        const barSpacing = this.chartWidth / this.data.length;
        // Add 10% spacing between bars
        return this.padding + index * barSpacing + (barSpacing * 0.1);
    }

    getBarWidth(): number {
        if (this.data.length === 0) return 0;
        const barSpacing = this.chartWidth / this.data.length;
        return barSpacing * 0.8;
    }
}
