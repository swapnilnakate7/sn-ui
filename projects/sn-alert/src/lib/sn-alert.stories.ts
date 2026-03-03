import type { Meta, StoryObj } from '@storybook/angular';
import { SnAlertComponent } from './sn-alert.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnAlertComponent> = {
    title: 'Components/Alert',
    component: SnAlertComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        scheme: {
            control: 'select',
            options: ['info', 'success', 'warning', 'error', 'default'],
            description: 'The color scheme of the alert',
        },
        title: { control: 'text', description: 'The title of the alert' },
        dismissible: { control: 'boolean', description: 'Whether the alert can be dismissed' },
        dismissed: { action: 'dismissed', description: 'Event emitted when the alert is dismissed' },
    },
    args: {
        scheme: 'info',
        title: 'Alert Title',
        dismissible: false,
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-alert [scheme]="scheme" [title]="title" [dismissible]="dismissible" (dismissed)="dismissed()">
        This is an alert message to inform the user about something important.
      </sn-alert>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnAlertComponent>;

export const Info: Story = {
    args: {
        scheme: 'info',
        title: 'Information',
    },
};

export const Success: Story = {
    args: {
        scheme: 'success',
        title: 'Success Message',
    },
};

export const Warning: Story = {
    args: {
        scheme: 'warning',
        title: 'Warning Alert',
    },
};

export const Error: Story = {
    args: {
        scheme: 'error',
        title: 'Error Occurred',
    },
};

export const Dismissible: Story = {
    args: {
        scheme: 'info',
        title: 'Dismissible Alert',
        dismissible: true,
    },
};
