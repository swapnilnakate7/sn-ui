import type { Meta, StoryObj } from '@storybook/angular';
import { SnTextareaComponent } from './sn-textarea';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const meta: Meta<SnTextareaComponent> = {
    title: 'Components/Textarea',
    component: SnTextareaComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule, FormsModule],
        }),
    ],
    argTypes: {
        id: { control: 'text', description: 'HTML id attribute' },
        label: { control: 'text', description: 'Label text' },
        placeholder: { control: 'text', description: 'Placeholder text' },
        name: { control: 'text', description: 'HTML name attribute' },
        rows: { control: 'number', description: 'Number of rows to display' },
        maxLength: { control: 'number', description: 'Maximum character length allow' },
        disabled: { control: 'boolean', description: 'Whether the textarea is disabled' },
        autoResize: { control: 'boolean', description: 'Whether to auto-resize based on content' },
        readonly: { control: 'boolean', description: 'Whether the textarea is read-only' },
        changed: { action: 'changed', description: 'Event emitted when the value changes' },
    },
    args: {
        id: 'textarea-1',
        label: 'Message',
        placeholder: 'Enter your message here...',
        rows: 4,
        disabled: false,
        autoResize: true,
        readonly: false,
    },
};

export default meta;
type Story = StoryObj<SnTextareaComponent>;

export const Default: Story = {};

export const WithMaxLength: Story = {
    args: {
        maxLength: 100,
        label: 'Message (Max 100 chars)',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        value: 'This textarea is disabled.',
    } as any,
};

export const Readonly: Story = {
    args: {
        readonly: true,
        value: 'This textarea is read-only.',
    } as any,
};

export const FixedSize: Story = {
    args: {
        autoResize: false,
        rows: 10,
        label: 'Fixed Size (10 rows)',
    },
};
