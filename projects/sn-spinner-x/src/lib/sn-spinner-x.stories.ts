import type { Meta, StoryObj } from '@storybook/angular';
import { SnSpinnerXComponent } from './sn-spinner-x.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnSpinnerXComponent> = {
    title: 'Components/Spinner',
    component: SnSpinnerXComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        scheme: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
            description: 'The color scheme of the spinner',
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'The size of the spinner',
        },
        label: { control: 'text', description: 'Loading text to display next to the spinner' },
    },
    args: {
        scheme: 'primary',
        size: 'md',
        label: 'Loading...',
    },
};

export default meta;
type Story = StoryObj<SnSpinnerXComponent>;

export const Default: Story = {};

export const Primary: Story = {
    args: {
        scheme: 'primary',
    },
};

export const WithoutLabel: Story = {
    args: {
        label: '',
    },
};

export const Sizes: Story = {
    render: (args: any) => ({
        props: args,
        template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <sn-spinner-x size="xs" label="Extra Small"></sn-spinner-x>
        <sn-spinner-x size="sm" label="Small"></sn-spinner-x>
        <sn-spinner-x size="md" label="Medium"></sn-spinner-x>
        <sn-spinner-x size="lg" label="Large"></sn-spinner-x>
        <sn-spinner-x size="xl" label="Extra Large"></sn-spinner-x>
      </div>
    `,
    }),
};

export const ColorSchemes: Story = {
    render: (args: any) => ({
        props: args,
        template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <sn-spinner-x scheme="primary" label="Primary"></sn-spinner-x>
        <sn-spinner-x scheme="secondary" label="Secondary"></sn-spinner-x>
        <sn-spinner-x scheme="success" label="Success"></sn-spinner-x>
        <sn-spinner-x scheme="danger" label="Danger"></sn-spinner-x>
        <sn-spinner-x scheme="warning" label="Warning"></sn-spinner-x>
        <sn-spinner-x scheme="info" label="Info"></sn-spinner-x>
        <sn-spinner-x scheme="dark" label="Dark"></sn-spinner-x>
      </div>
    `,
    }),
};
