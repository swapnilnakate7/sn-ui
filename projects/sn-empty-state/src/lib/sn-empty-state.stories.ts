import type { Meta, StoryObj } from '@storybook/angular';
import { SnEmptyStateComponent } from './sn-empty-state.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnEmptyStateComponent> = {
    title: 'Components/Empty State',
    component: SnEmptyStateComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        title: { control: 'text', description: 'Title of the empty state' },
        description: { control: 'text', description: 'Explanation or message' },
        actionText: { control: 'text', description: 'Primary action button text (hides if empty)' },
        iconClass: { control: 'text', description: 'Icon class (uses default SVG if empty)' },
        actionClicked: { action: 'actionClicked', description: 'Triggered when the button is clicked' },
    },
    args: {
        title: 'No Data Found',
        description: 'There is currently no data to display here.',
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-empty-state 
        [title]="title" 
        [description]="description" 
        [actionText]="actionText" 
        [iconClass]="iconClass"
        (actionClicked)="actionClicked($event)">
      </sn-empty-state>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnEmptyStateComponent>;

export const Default: Story = {};

export const WithAction: Story = {
    args: {
        title: 'No Projects Found',
        description: 'You haven\'t created any projects yet. Start by generating a new one.',
        actionText: 'Create Project',
    },
};

export const CustomFontIcon: Story = {
    args: {
        title: 'Connection Lost',
        description: 'Ensure your device is connected to the internet.',
        iconClass: 'fa-solid fa-wifi',
        actionText: 'Retry Connection',
    },
};
