import type { Meta, StoryObj } from '@storybook/angular';
import { SnProgressBarComponent } from './sn-progress-bar.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnProgressBarComponent> = {
    title: 'Components/Progress Bar',
    component: SnProgressBarComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        value: { control: { type: 'range', min: 0, max: 100 }, description: 'Current progress value' },
        max: { control: 'number', description: 'Maximum value' },
        indeterminate: { control: 'boolean', description: 'Show infinite animated stripes' },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the progress bar track',
        },
        theme: {
            control: 'select',
            options: ['primary', 'success', 'warn', 'danger', 'info'],
            description: 'Color scheme',
        },
        showLabel: { control: 'boolean', description: 'Show the percentage label' },
        labelText: { control: 'text', description: 'Custom text to prepend to the label' },
    },
    args: {
        value: 45,
        max: 100,
        indeterminate: false,
        size: 'md',
        theme: 'primary',
        showLabel: false,
        labelText: '',
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-progress-bar 
        [value]="value" 
        [max]="max" 
        [indeterminate]="indeterminate" 
        [size]="size" 
        [theme]="theme" 
        [showLabel]="showLabel" 
        [labelText]="labelText">
      </sn-progress-bar>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnProgressBarComponent>;

export const Default: Story = {
    args: {
        value: 60,
    },
};

export const LargeWithLabels: Story = {
    args: {
        value: 75,
        size: 'lg',
        theme: 'success',
        showLabel: true,
    },
};

export const SmallSubtle: Story = {
    args: {
        value: 30,
        size: 'sm',
        theme: 'info',
    },
};

export const IndeterminateAnimation: Story = {
    args: {
        indeterminate: true,
        theme: 'warn',
        size: 'md',
    },
};

export const WithCustomLabelText: Story = {
    args: {
        value: 88,
        size: 'md',
        theme: 'primary',
        showLabel: true,
        labelText: 'Downloading Update...',
    },
};

export const DangerState: Story = {
    args: {
        value: 15,
        size: 'md',
        theme: 'danger',
        showLabel: true,
        labelText: 'Memory Limit Reached!',
    },
};
