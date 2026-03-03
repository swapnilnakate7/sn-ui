import type { Meta, StoryObj } from '@storybook/angular';
import { SnTabsXComponent } from './sn-tabs-x.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const sampleTabs = [
    { label: 'Tab 1', content: 'Content for the first tab.' },
    { label: 'Tab 2', content: 'Content for the second tab.' },
    { label: 'Tab 3', content: 'Content for the third tab.' },
];

const meta: Meta<SnTabsXComponent> = {
    title: 'Components/Tabs',
    component: SnTabsXComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        tabs: { control: 'object', description: 'List of tabs with labels and contents' },
        activeIndex: { control: 'number', description: 'Index of the active tab' },
        tabChange: { action: 'tabChange', description: 'Event emitted when the tab changes' },
    },
    args: {
        tabs: sampleTabs,
        activeIndex: 0,
    },
};

export default meta;
type Story = StoryObj<SnTabsXComponent>;

export const Default: Story = {};

export const SecondTabActive: Story = {
    args: {
        activeIndex: 1,
    },
};

export const ManyTabs: Story = {
    args: {
        tabs: [
            ...sampleTabs,
            { label: 'Tab 4', content: 'Content for the fourth tab.' },
            { label: 'Tab 5', content: 'Content for the fifth tab.' },
            { label: 'Tab 6', content: 'Content for the sixth tab.' },
        ],
    },
};
