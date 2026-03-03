import type { Meta, StoryObj } from '@storybook/angular';
import { SnInputComponent } from './sn-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<SnInputComponent> = {
    title: 'Components/Input',
    component: SnInputComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ReactiveFormsModule],
        }),
    ],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'password', 'email', 'number', 'tel', 'url'],
            description: 'The type of the input field',
        },
        label: { control: 'text', description: 'Label text for the input' },
        placeholder: { control: 'text', description: 'Placeholder text' },
        required: { control: 'boolean', description: 'Marks the input as required' },
        pattern: { control: 'text', description: 'Regex pattern for validation' },
    },
    args: {
        type: 'text',
        label: 'Email Address',
        placeholder: 'Enter your email',
        required: false,
    },
};

export default meta;
type Story = StoryObj<SnInputComponent>;

export const Default: Story = {
    args: {
        label: 'Username',
        placeholder: 'Enter your username',
    },
};

export const Required: Story = {
    args: {
        label: 'Email Address',
        type: 'email',
        required: true,
        placeholder: 'Enter your email address',
    },
};

export const WithError: Story = {
    args: {
        label: 'Password',
        type: 'password',
        errorMessages: ['Password must be at least 8 characters long.'],
        required: true,
    },
};

export const WithSuccess: Story = {
    args: {
        label: 'Username',
        successMessages: ['This username is available!'],
    },
};

export const WithWarning: Story = {
    args: {
        label: 'Caps Lock',
        warningMessages: ['Caps lock is on.'],
    },
};

export const WithInfo: Story = {
    args: {
        label: 'Reference Code',
        infoMessages: ['Optional: Enter a reference code if you have one.'],
    },
};

export const NumberInput: Story = {
    args: {
        label: 'Age',
        type: 'number',
        placeholder: 'Enter your age',
    },
};
