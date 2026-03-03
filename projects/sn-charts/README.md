# sn-charts

Native SVG chart components for Angular — **zero external dependencies**.

## Installation

```bash
npm install @nicosnapps/sn-charts
```

## Components

### Bar Chart

```typescript
import { SnBarChartComponent } from '@nicosnapps/sn-charts';

@Component({
  imports: [SnBarChartComponent],
  template: `
    <sn-bar-chart [data]="data" color="#3b82f6" [height]="300"></sn-bar-chart>
  `
})
export class MyComponent {
  data = [
    { label: 'Jan', value: 30 },
    { label: 'Feb', value: 80 },
    { label: 'Mar', value: 45 },
  ];
}
```

### Line Chart

```typescript
import { SnLineChartComponent } from '@nicosnapps/sn-charts';

@Component({
  imports: [SnLineChartComponent],
  template: `
    <sn-line-chart [data]="data" color="#ec4899" [fillArea]="true" [height]="300"></sn-line-chart>
  `
})
```

### Pie / Donut Chart

```typescript
import { SnPieChartComponent } from '@nicosnapps/sn-charts';

@Component({
  imports: [SnPieChartComponent],
  template: `
    <sn-pie-chart [data]="data" [size]="250" [donut]="true" [showLegend]="true"></sn-pie-chart>
  `
})
export class MyComponent {
  data = [
    { label: 'Direct', value: 40 },
    { label: 'Organic', value: 30, color: '#10b981' },
    { label: 'Social', value: 15 },
  ];
}
```

## Features

- **Native SVG** — no Chart.js, D3, or other dependencies
- **Responsive** — automatically resizes to container width
- **Interactive** — hover tooltips on all chart types
- **Animated** — line draw animation, fade-in effects
- **Donut mode** — pie chart supports donut with center label

## Part of [sn-ui](https://github.com/nicosnapps/sn-ui)
