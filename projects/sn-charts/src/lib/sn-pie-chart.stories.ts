import type { Meta, StoryObj } from '@storybook/angular';
import { SnPieChartComponent } from './sn-pie-chart.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnPieChartComponent> = {
    title: 'Components/Charts/Pie Chart',
    component: SnPieChartComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        data: { control: 'object', description: 'Array of data slices {label, value, color?}' },
        size: { control: 'number', description: 'Diameter of the chart in px' },
        donut: { control: 'boolean', description: 'Render as donut chart' },
        donutWidth: { control: 'number', description: 'Donut ring thickness' },
        showLegend: { control: 'boolean', description: 'Show legend beside the chart' },
    },
    args: {
        size: 250,
        donut: false,
        donutWidth: 60,
        showLegend: true,
        data: [
            { label: 'Direct', value: 40 },
            { label: 'Organic', value: 30 },
            { label: 'Referral', value: 20 },
            { label: 'Social', value: 10 },
        ],
    },
    render: (args: any) => ({
        props: args,
        template: `
      <div style="padding: 2rem; background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1)">
        <sn-pie-chart 
          [data]="data" 
          [size]="size" 
          [donut]="donut" 
          [donutWidth]="donutWidth"
          [showLegend]="showLegend">
        </sn-pie-chart>
      </div>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnPieChartComponent>;

export const DefaultPie: Story = {};

export const DonutChart: Story = {
    args: {
        donut: true,
        data: [
            { label: 'Completed', value: 65, color: '#10b981' },
            { label: 'In Progress', value: 25, color: '#f59e0b' },
            { label: 'Pending', value: 10, color: '#ef4444' },
        ],
    },
};

export const ManySlices: Story = {
    args: {
        size: 300,
        data: [
            { label: 'US', value: 35 },
            { label: 'UK', value: 15 },
            { label: 'Germany', value: 12 },
            { label: 'France', value: 10 },
            { label: 'Japan', value: 8 },
            { label: 'India', value: 7 },
            { label: 'Brazil', value: 6 },
            { label: 'Canada', value: 4 },
            { label: 'Other', value: 3 },
        ],
    },
};
