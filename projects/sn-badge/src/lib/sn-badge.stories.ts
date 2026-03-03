import type { Meta, StoryObj } from '@storybook/angular';
import { SnBadgeComponent } from './sn-badge.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnBadgeComponent> = {
    title: 'Components/Badge',
    component: SnBadgeComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        scheme: {
            control: 'select',
            options: ['default', 'primary', 'success', 'danger', 'warning', 'info'],
            description: 'The color scheme of the badge',
        },
        pill: { control: 'boolean', description: 'Whether the badge is pill-shaped' },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the badge',
        },
    },
    args: {
        scheme: 'default',
        pill: false,
        size: 'md',
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-badge [scheme]="scheme" [pill]="pill" [size]="size">
        Badge
      </sn-badge>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnBadgeComponent>;

export const Default: Story = {
    args: {
        scheme: 'default',
    },
};

export const Primary: Story = {
    args: {
        scheme: 'primary',
    },
};

export const Success: Story = {
    args: {
        scheme: 'success',
    },
};

export const Danger: Story = {
    args: {
        scheme: 'danger',
    },
};

export const Pill: Story = {
    args: {
        scheme: 'primary',
        pill: true,
    },
};

export const Sizes: Story = {
    render: (args: any) => ({
        props: args,
        template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <sn-badge size="sm" scheme="primary">Small</sn-badge>
        <sn-badge size="md" scheme="primary">Medium</sn-badge>
        <sn-badge size="lg" scheme="primary">Large</sn-badge>
      </div>
    `,
    }),
};
