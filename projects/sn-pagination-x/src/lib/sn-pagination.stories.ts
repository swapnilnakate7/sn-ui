import type { Meta, StoryObj } from '@storybook/angular';
import { SnPaginationComponent } from './sn-pagination-x.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnPaginationComponent> = {
    title: 'Components/Pagination',
    component: SnPaginationComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        totalItems: { control: 'number', description: 'Total number of items' },
        pageSize: { control: 'number', description: 'Number of items per page' },
        currentPage: { control: 'number', description: 'The currently active page (1-indexed)' },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Controls the dimensions of the pagination buttons',
        },
        disabled: { control: 'boolean', description: 'Disable all interactions' },
        pageChange: { action: 'pageChange', description: 'Event emitted when the page changes' },
    },
    args: {
        totalItems: 100,
        pageSize: 10,
        currentPage: 1,
        size: 'md',
        disabled: false,
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-pagination-x 
        [totalItems]="totalItems" 
        [pageSize]="pageSize" 
        [currentPage]="currentPage" 
        [size]="size" 
        [disabled]="disabled"
        (pageChange)="pageChange($event)">
      </sn-pagination-x>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnPaginationComponent>;

export const Default: Story = {
    args: {
        totalItems: 50,
        currentPage: 1,
    },
};

export const ManyPages: Story = {
    args: {
        totalItems: 1200,
        currentPage: 15,
    },
};

export const Small: Story = {
    args: {
        totalItems: 40,
        currentPage: 2,
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        totalItems: 80,
        currentPage: 4,
        size: 'lg',
    },
};

export const Disabled: Story = {
    args: {
        totalItems: 100,
        currentPage: 5,
        disabled: true,
    },
};
