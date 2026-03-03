import type { Meta, StoryObj } from '@storybook/angular';
import { SnDatatableComponent } from './sn-datatable';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const sampleColumns = [
    { header: 'ID', key: 'id', sortable: true, width: '80px', align: 'left' as const },
    { header: 'Name', key: 'name', sortable: true },
    { header: 'Email', key: 'email', sortable: true },
    { header: 'Status', key: 'status', sortable: true, align: 'center' as const },
];

const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', status: 'Active' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Active' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', status: 'Active' },
    { id: 7, name: 'Edward Stark', email: 'edward@example.com', status: 'Inactive' },
    { id: 8, name: 'Fiona Gallagher', email: 'fiona@example.com', status: 'Active' },
    { id: 9, name: 'George Miller', email: 'george@example.com', status: 'Pending' },
    { id: 10, name: 'Hannah Abbott', email: 'hannah@example.com', status: 'Active' },
    { id: 11, name: 'Ian Malcolm', email: 'ian@example.com', status: 'Active' },
];

const meta: Meta<SnDatatableComponent> = {
    title: 'Components/DataTable',
    component: SnDatatableComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        columns: { control: 'object', description: 'Table column definitions' },
        data: { control: 'object', description: 'Table data' },
        striped: { control: 'boolean', description: 'Whether to show striped rows' },
        hoverable: { control: 'boolean', description: 'Whether to show hover state on rows' },
        bordered: { control: 'boolean', description: 'Whether to show borders around the table' },
        pageSize: { control: 'number', description: 'Number of rows per page' },
        sorted: { action: 'sorted', description: 'Event emitted when data is sorted' },
    },
    args: {
        columns: sampleColumns,
        data: sampleData,
        striped: true,
        hoverable: true,
        bordered: false,
        pageSize: 5,
    },
};

export default meta;
type Story = StoryObj<SnDatatableComponent>;

export const Default: Story = {};

export const Bordered: Story = {
    args: {
        bordered: true,
    },
};

export const WithoutStripes: Story = {
    args: {
        striped: false,
    },
};

export const NoHover: Story = {
    args: {
        hoverable: false,
    },
};
