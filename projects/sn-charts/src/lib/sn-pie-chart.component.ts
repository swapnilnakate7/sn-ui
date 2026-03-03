import { Component, Input, OnChanges, SimpleChanges, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SnPieChartData {
    label: string;
    value: number;
    color?: string;
}

const DEFAULT_COLORS = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
];

@Component({
    selector: 'sn-pie-chart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './sn-pie-chart.component.html',
    styleUrls: ['./sn-pie-chart.component.scss'],
})
export class SnPieChartComponent implements OnChanges {
    @Input() data: SnPieChartData[] = [];
    @Input() size: number = 250;
    @Input() donut: boolean = false;
    @Input() donutWidth: number = 60;
    @Input() showLegend: boolean = true;

    hoveredIndex: number | null = null;
    slices: PieSlice[] = [];
    total: number = 0;

    get cx(): number { return this.size / 2; }
    get cy(): number { return this.size / 2; }
    get radius(): number { return this.size / 2 - 10; }
    get innerRadius(): number { return this.donut ? this.radius - this.donutWidth : 0; }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data'] || changes['size'] || changes['donut'] || changes['donutWidth']) {
            this.calculateSlices();
        }
    }

    calculateSlices(): void {
        this.total = this.data.reduce((sum, d) => sum + d.value, 0);
        if (this.total === 0) {
            this.slices = [];
            return;
        }

        let currentAngle = -90; // Start from top
        this.slices = this.data.map((d, i) => {
            const percentage = d.value / this.total;
            const angle = percentage * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle = endAngle;

            const color = d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];

            return {
                path: this.describeArc(this.cx, this.cy, this.radius, this.innerRadius, startAngle, endAngle),
                color,
                label: d.label,
                value: d.value,
                percentage: Math.round(percentage * 100),
                labelX: this.getLabelX(startAngle, endAngle),
                labelY: this.getLabelY(startAngle, endAngle),
            };
        });
    }

    private polarToCartesian(cx: number, cy: number, r: number, angleDeg: number): { x: number; y: number } {
        const rad = (angleDeg * Math.PI) / 180;
        return {
            x: cx + r * Math.cos(rad),
            y: cy + r * Math.sin(rad),
        };
    }

    private describeArc(cx: number, cy: number, outerR: number, innerR: number, startAngle: number, endAngle: number): string {
        const outerStart = this.polarToCartesian(cx, cy, outerR, endAngle);
        const outerEnd = this.polarToCartesian(cx, cy, outerR, startAngle);
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        if (innerR > 0) {
            // Donut path
            const innerStart = this.polarToCartesian(cx, cy, innerR, endAngle);
            const innerEnd = this.polarToCartesian(cx, cy, innerR, startAngle);
            return [
                'M', outerStart.x, outerStart.y,
                'A', outerR, outerR, 0, largeArc, 0, outerEnd.x, outerEnd.y,
                'L', innerEnd.x, innerEnd.y,
                'A', innerR, innerR, 0, largeArc, 1, innerStart.x, innerStart.y,
                'Z'
            ].join(' ');
        } else {
            // Full pie path
            return [
                'M', outerStart.x, outerStart.y,
                'A', outerR, outerR, 0, largeArc, 0, outerEnd.x, outerEnd.y,
                'L', cx, cy,
                'Z'
            ].join(' ');
        }
    }

    private getLabelX(startAngle: number, endAngle: number): number {
        const midAngle = (startAngle + endAngle) / 2;
        const labelRadius = this.donut ? (this.radius + this.innerRadius) / 2 : this.radius * 0.65;
        return this.polarToCartesian(this.cx, this.cy, labelRadius, midAngle).x;
    }

    private getLabelY(startAngle: number, endAngle: number): number {
        const midAngle = (startAngle + endAngle) / 2;
        const labelRadius = this.donut ? (this.radius + this.innerRadius) / 2 : this.radius * 0.65;
        return this.polarToCartesian(this.cx, this.cy, labelRadius, midAngle).y;
    }
}

interface PieSlice {
    path: string;
    color: string;
    label: string;
    value: number;
    percentage: number;
    labelX: number;
    labelY: number;
}
