import type { Meta, StoryObj } from '@storybook/angular';
import { TooltipDirective } from './tooltip.directive';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta = {
    title: 'Directives/Tooltip',
    component: TooltipDirective,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule, TooltipDirective],
        }),
    ],
    argTypes: {
        snTooltip: { control: 'text', description: 'The text to show in the tooltip' },
        tooltipPosition: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'The position of the tooltip relative to the host element'
        },
        tooltipDelay: { control: 'number', description: 'Delay in milliseconds before showing the tooltip' },
    },
    args: {
        snTooltip: 'This is a tooltip message',
        tooltipPosition: 'top',
        tooltipDelay: 200,
    },
    render: (args: any) => ({
        props: args,
        template: `
      <div style="padding: 100px; display: flex; justify-content: center; align-items: center;">
        <button 
          [snTooltip]="snTooltip" 
          [tooltipPosition]="tooltipPosition" 
          [tooltipDelay]="tooltipDelay"
          style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Hover over me
        </button>
      </div>
    `,
    }),
};

export default meta;
type Story = StoryObj;

export const Top: Story = {
    args: {
        tooltipPosition: 'top',
    },
};

export const Bottom: Story = {
    args: {
        tooltipPosition: 'bottom',
    },
};

export const Left: Story = {
    args: {
        tooltipPosition: 'left',
    },
};

export const Right: Story = {
    args: {
        tooltipPosition: 'right',
    },
};

export const LongText: Story = {
    args: {
        snTooltip: 'This is a very long tooltip message that might wrap if the container width is restricted or if the text is exceptionally long.',
    },
};
