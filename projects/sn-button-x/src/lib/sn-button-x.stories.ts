import type { Meta, StoryObj } from '@storybook/angular';
import { SnButtonComponent } from './sn-button-x.component';
import { moduleMetadata } from '@storybook/angular';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

const meta: Meta<SnButtonComponent> = {
    title: 'Components/Button',
    component: SnButtonComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule, FaIconComponent],
        }),
    ],
    argTypes: {
        scheme: {
            control: 'select',
            options: ['default', 'primary', 'success', 'danger', 'warn', 'primary-outlined', 'success-outlined', 'danger-outlined', 'warn-outlined'],
            description: 'Color scheme of the button',
        },
        disabled: { control: 'boolean', description: 'Disable the button' },
        rounded: { control: 'boolean', description: 'Make the button fully rounded (pill shape)' },
        raised: { control: 'boolean', description: 'Add a shadow to the button' },
        icon: { control: 'text', description: 'FontAwesome icon name (e.g. coffee)' },
        text: { control: 'text', description: 'Text to display inside the button' },
    },
    args: {
        text: 'Click Me',
        scheme: 'primary',
        disabled: false,
        rounded: false,
        raised: false,
        icon: '',
    },
    render: (args: any) => ({
        props: args,
        template: `
          <sn-button-x 
            [scheme]="scheme" 
            [disabled]="disabled" 
            [rounded]="rounded" 
            [raised]="raised" 
            [icon]="icon">
            {{text}}
          </sn-button-x>
        `,
    }),
};

export default meta;
type Story = StoryObj<SnButtonComponent & { text: string }>;

export const Primary: Story = {
    args: {
        text: 'Primary Button',
        scheme: 'primary',
    },
};

export const Success: Story = {
    args: {
        text: 'Success Button',
        scheme: 'success',
    },
};

export const Danger: Story = {
    args: {
        text: 'Delete Account',
        scheme: 'danger',
    },
};

export const Outlined: Story = {
    args: {
        text: 'Outlined Primary',
        scheme: 'primary-outlined',
    },
};

export const Rounded: Story = {
    args: {
        text: 'Rounded Pill',
        scheme: 'primary',
        rounded: true,
    },
};

export const Raised: Story = {
    args: {
        text: 'Raised Button',
        scheme: 'primary',
        raised: true,
    },
};

export const WithIcon: Story = {
    args: {
        text: 'Coffee Time',
        scheme: 'warn',
        icon: 'coffee',
    },
};

export const Disabled: Story = {
    args: {
        text: 'Disabled Action',
        scheme: 'primary',
        disabled: true,
    },
};
