import type { Meta, StoryObj } from '@storybook/angular';
import { SnBreadcrumbsComponent } from './sn-breadcrumbs.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnBreadcrumbsComponent> = {
    title: 'Components/Breadcrumbs',
    component: SnBreadcrumbsComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        items: { control: 'object', description: 'Array of breadcrumb step objects' },
        itemClick: { action: 'itemClick', description: 'Emitted when a breadcrumb is clicked' },
    },
    args: {
        items: [
            { label: 'Home', path: '#' },
            { label: 'Library', path: '#' },
            { label: 'Data', path: '#' },
        ],
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-breadcrumbs 
        [items]="items"
        (itemClick)="itemClick($event)">
      </sn-breadcrumbs>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnBreadcrumbsComponent>;

export const Default: Story = {
    args: {
        items: [
            { label: 'Home', path: '#' },
            { label: 'Library', path: '#' },
            { label: 'Current Page' },
        ],
    },
};

export const WithDisabledStep: Story = {
    args: {
        items: [
            { label: 'Home', path: '#' },
            { label: 'Store', path: '#' },
            { label: 'Shoes', disabled: true },
            { label: 'Nike' },
        ],
    },
};
