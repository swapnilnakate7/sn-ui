import type { Meta, StoryObj } from '@storybook/angular';
import { SnCheckboxXComponent } from './sn-checkbox-x';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const meta: Meta<SnCheckboxXComponent> = {
    title: 'Components/Checkbox',
    component: SnCheckboxXComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule, FormsModule],
        }),
    ],
    argTypes: {
        id: { control: 'text', description: 'HTML id attribute' },
        label: { control: 'text', description: 'Label text' },
        name: { control: 'text', description: 'HTML name attribute' },
        disabled: { control: 'boolean', description: 'Whether the checkbox is disabled' },
        indeterminate: { control: 'boolean', description: 'Whether the checkbox is in an indeterminate state' },
        changed: { action: 'changed', description: 'Event emitted when the value changes' },
    },
    args: {
        id: 'checkbox-1',
        label: 'I agree to the terms',
        disabled: false,
        indeterminate: false,
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-checkbox-x 
        [id]="id" 
        [label]="label" 
        [name]="name" 
        [disabled]="disabled" 
        [indeterminate]="indeterminate"
        (changed)="changed($event)">
      </sn-checkbox-x>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnCheckboxXComponent>;

export const Default: Story = {};

export const Checked: Story = {
    render: (args: any) => ({
        props: { ...args, model: true },
        template: `
      <sn-checkbox-x 
        [id]="id" 
        [label]="label" 
        [(ngModel)]="model"
        (changed)="changed($event)">
      </sn-checkbox-x>
    `,
    }),
};

export const Indeterminate: Story = {
    args: {
        indeterminate: true,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
