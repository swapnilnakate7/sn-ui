import type { Meta, StoryObj } from '@storybook/angular';
import { SnRadioComponent } from './sn-radio';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const meta: Meta<SnRadioComponent> = {
    title: 'Components/Radio',
    component: SnRadioComponent,
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
        value: { control: 'text', description: 'Value of the radio button' },
        disabled: { control: 'boolean', description: 'Whether the radio button is disabled' },
        changed: { action: 'changed', description: 'Event emitted when the radio is selected' },
    },
    args: {
        id: 'radio-1',
        label: 'Option 1',
        name: 'options',
        value: '1',
        disabled: false,
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-radio 
        [id]="id" 
        [label]="label" 
        [name]="name" 
        [value]="value" 
        [disabled]="disabled"
        (changed)="changed($event)">
      </sn-radio>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnRadioComponent>;

export const Default: Story = {};

export const RadioGroup: Story = {
    render: (args: any) => ({
        props: { ...args, model: '1' },
        template: `
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <sn-radio name="group1" label="Option 1" value="1" [(ngModel)]="model"></sn-radio>
        <sn-radio name="group1" label="Option 2" value="2" [(ngModel)]="model"></sn-radio>
        <sn-radio name="group1" label="Option 3" value="3" [(ngModel)]="model"></sn-radio>
        <p>Selected value: {{model}}</p>
      </div>
    `,
    }),
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
