import type { Meta, StoryObj } from '@storybook/angular';
import { SnToggleComponent } from './sn-toggle.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnToggleComponent> = {
    title: 'Components/Toggle',
    component: SnToggleComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        checked: { control: 'boolean', description: 'Whether the toggle is checked' },
        disabled: { control: 'boolean', description: 'Whether the toggle is disabled' },
        label: { control: 'text', description: 'Label text' },
        scheme: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
            description: 'The color scheme of the toggle',
        },
        toggled: { action: 'toggled', description: 'Event emitted when the toggle state changes' },
    },
    args: {
        checked: false,
        disabled: false,
        label: 'Enable notifications',
        scheme: 'primary',
    },
};

export default meta;
type Story = StoryObj<SnToggleComponent>;

export const Default: Story = {};

export const Checked: Story = {
    args: {
        checked: true,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const Schemes: Story = {
    render: (args: any) => ({
        props: args,
        template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <sn-toggle label="Primary" scheme="primary" [checked]="true"></sn-toggle>
        <sn-toggle label="Secondary" scheme="secondary" [checked]="true"></sn-toggle>
        <sn-toggle label="Success" scheme="success" [checked]="true"></sn-toggle>
        <sn-toggle label="Danger" scheme="danger" [checked]="true"></sn-toggle>
        <sn-toggle label="Warning" scheme="warning" [checked]="true"></sn-toggle>
        <sn-toggle label="Info" scheme="info" [checked]="true"></sn-toggle>
      </div>
    `,
    }),
};
