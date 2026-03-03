import type { Meta, StoryObj } from '@storybook/angular';
import { SnDropdownXComponent } from './sn-dropdown-x';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const sampleOptions = [
    { label: 'Angular', value: 'angular' },
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Ember', value: 'ember', disabled: true },
    { label: 'Backbone', value: 'backbone' },
];

const meta: Meta<SnDropdownXComponent> = {
    title: 'Components/Dropdown',
    component: SnDropdownXComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule, FormsModule, ReactiveFormsModule],
        }),
    ],
    argTypes: {
        id: { control: 'text', description: 'HTML id attribute' },
        label: { control: 'text', description: 'Label text' },
        placeholder: { control: 'text', description: 'Placeholder text' },
        options: { control: 'object', description: 'List of options' },
        disabled: { control: 'boolean', description: 'Whether the dropdown is disabled' },
        searchable: { control: 'boolean', description: 'Whether searching is enabled' },
        multiple: { control: 'boolean', description: 'Whether multiple selection is enabled' },
        clearable: { control: 'boolean', description: 'Whether selection can be cleared' },
        changed: { action: 'changed', description: 'Event emitted when the value changes' },
    },
    args: {
        id: 'dropdown-1',
        label: 'Framework',
        placeholder: 'Select a framework',
        options: sampleOptions,
        disabled: false,
        searchable: false,
        multiple: false,
        clearable: true,
    },
};

export default meta;
type Story = StoryObj<SnDropdownXComponent>;

export const Default: Story = {};

export const Searchable: Story = {
    args: {
        searchable: true,
    },
};

export const Multiple: Story = {
    args: {
        multiple: true,
        placeholder: 'Select multiple frameworks',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const SearchableMultiple: Story = {
    args: {
        searchable: true,
        multiple: true,
        placeholder: 'Search and select frameworks',
    },
};
