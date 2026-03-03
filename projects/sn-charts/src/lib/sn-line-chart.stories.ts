import type { Meta, StoryObj } from '@storybook/angular';
import { SnLineChartComponent } from './sn-line-chart.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnLineChartComponent> = {
    title: 'Components/Charts/Line Chart',
    component: SnLineChartComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        data: { control: 'object', description: 'Array of data points {label: string, value: number}' },
        color: { control: 'color', description: 'Stroke and fill color for the line path' },
        height: { control: 'number', description: 'Height of the chart in pixels' },
        fillArea: { control: 'boolean', description: 'Shade the area under the line with a gradient' }
    },
    args: {
        height: 300,
        color: '#ec4899',
        fillArea: true,
        data: [
            { label: 'Mon', value: 12 },
            { label: 'Tue', value: 45 },
            { label: 'Wed', value: 30 },
            { label: 'Thu', value: 80 },
            { label: 'Fri', value: 65 },
            { label: 'Sat', value: 105 },
            { label: 'Sun', value: 90 }
        ],
    },
    render: (args: any) => ({
        props: args,
        template: `
      <div style="padding: 2rem; background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1)">
        <sn-line-chart 
          [data]="data" 
          [color]="color" 
          [fillArea]="fillArea"
          [height]="height">
        </sn-line-chart>
      </div>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnLineChartComponent>;

export const PrimaryPink: Story = {};

export const NoAreaFill: Story = {
    args: {
        fillArea: false,
        color: '#3b82f6',
        data: [
            { label: 'Q1', value: 25 },
            { label: 'Q2', value: 38 },
            { label: 'Q3', value: 60 },
            { label: 'Q4', value: 45 },
        ],
    },
};

export const HighContrast: Story = {
    args: {
        color: '#8b5cf6',
        height: 400,
        data: [
            { label: '10:00', value: 120 },
            { label: '11:00', value: 200 },
            { label: '12:00', value: 150 },
            { label: '13:00', value: 300 },
            { label: '14:00', value: 250 },
        ],
    },
};
