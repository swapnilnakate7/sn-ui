import type { Meta, StoryObj } from '@storybook/angular';
import { SnBarChartComponent } from './sn-bar-chart.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnBarChartComponent> = {
    title: 'Components/Charts/Bar Chart',
    component: SnBarChartComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        data: { control: 'object', description: 'Array of data points {label: string, value: number}' },
        color: { control: 'color', description: 'Fill color for bars' },
        height: { control: 'number', description: 'Height of the chart in pixels' },
    },
    args: {
        height: 300,
        color: '#3b82f6',
        data: [
            { label: 'Jan', value: 30 },
            { label: 'Feb', value: 80 },
            { label: 'Mar', value: 45 },
            { label: 'Apr', value: 90 },
            { label: 'May', value: 65 },
            { label: 'Jun', value: 110 },
            { label: 'Jul', value: 85 }
        ],
    },
    render: (args: any) => ({
        props: args,
        template: `
      <!-- Wrapped in a padded container for visibility in docs -->
      <div style="padding: 2rem; background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1)">
        <sn-bar-chart 
          [data]="data" 
          [color]="color" 
          [height]="height">
        </sn-bar-chart>
      </div>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnBarChartComponent>;

export const PrimaryBlue: Story = {};

export const SuccessGreen: Story = {
    args: {
        color: '#10b981',
        data: [
            { label: 'Q1', value: 25000 },
            { label: 'Q2', value: 38000 },
            { label: 'Q3', value: 12000 },
            { label: 'Q4', value: 55000 },
        ],
    },
};

export const WarningAmber: Story = {
    args: {
        color: '#f59e0b',
        data: [
            { label: 'Mon', value: 12 },
            { label: 'Tue', value: 18 },
            { label: 'Wed', value: 9 },
            { label: 'Thu', value: 25 },
            { label: 'Fri', value: 40 },
        ],
    },
};
