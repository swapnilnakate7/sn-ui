import { Component, Input, OnChanges, SimpleChanges, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SnLineChartData {
    label: string;
    value: number;
}

@Component({
    selector: 'sn-line-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sn-line-chart.component.html',
    styleUrls: ['./sn-line-chart.component.scss'],
})
export class SnLineChartComponent implements OnChanges {
    @Input() data: SnLineChartData[] = [];
    @Input() color: string = '#ec4899';
    @Input() fillArea: boolean = true;
    @Input() height: number = 300;

    width: number = 600;
    padding: number = 40;

    maxValue: number = 0;
    chartWidth: number = 0;
    chartHeight: number = 0;

    hoveredIndex: number | null = null;

    linePath: string = '';
    areaPath: string = '';

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
        this.maxValue = maxDataVal > 0 ? maxDataVal * 1.1 : 10;

        this.chartWidth = Math.max(0, this.width - this.padding * 2);
        this.chartHeight = Math.max(0, this.height - this.padding * 2);

        this.generatePaths();
    }

    generatePaths() {
        if (this.data.length === 0) {
            this.linePath = '';
            this.areaPath = '';
            return;
        }

        const points = this.data.map((d, i) => {
            return this.getPointX(i) + ',' + this.getPointY(d.value);
        });
        this.linePath = 'M ' + points.join(' L ');

        if (this.fillArea) {
            const startX = this.getPointX(0);
            const endX = this.getPointX(this.data.length - 1);
            const baseY = this.height - this.padding;
            this.areaPath = this.linePath + ' L ' + endX + ',' + baseY + ' L ' + startX + ',' + baseY + ' Z';
        }
    }

    getPointY(value: number): number {
        if (this.maxValue === 0) return this.height - this.padding;
        const heightPercentage = value / this.maxValue;
        return this.height - this.padding - (heightPercentage * this.chartHeight);
    }

    getPointX(index: number): number {
        if (this.data.length <= 1) return this.padding;
        const pointSpacing = this.chartWidth / (this.data.length - 1);
        return this.padding + index * pointSpacing;
    }
}
