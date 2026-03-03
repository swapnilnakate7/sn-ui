import type { Meta, StoryObj } from '@storybook/angular';
import { SnAdvancedDatatableComponent } from './sn-advanced-datatable.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const sampleColumns = [
    { header: 'ID', key: 'id', sortable: true, width: '80px', align: 'center' as const },
    { header: 'Name', key: 'name', sortable: true, width: '200px' },
    { header: 'Email', key: 'email', sortable: true, width: '250px' },
    { header: 'Department', key: 'department', sortable: true, filterable: true, width: '150px' },
    { header: 'Status', key: 'status', sortable: true, filterable: true, width: '120px', align: 'center' as const },
];

const sampleData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson', 'Frank Miller', 'Grace Lee', 'Henry Taylor', 'Iris Davis', 'Jack Anderson'][i % 10],
    email: ['alice', 'bob', 'charlie', 'diana', 'eve', 'frank', 'grace', 'henry', 'iris', 'jack'][i % 10] + (i > 9 ? i : '') + '@company.com',
    department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][i % 5],
    status: i % 3 === 0 ? 'Inactive' : 'Active',
}));

const meta: Meta<SnAdvancedDatatableComponent> = {
    title: 'Components/Advanced Datatable',
    component: SnAdvancedDatatableComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule, FormsModule],
        }),
    ],
    argTypes: {
        searchable: { control: 'boolean' },
        filterable: { control: 'boolean' },
        selectable: { control: 'boolean' },
        expandable: { control: 'boolean' },
        striped: { control: 'boolean' },
        hoverable: { control: 'boolean' },
        bordered: { control: 'boolean' },
        pageSize: { control: 'number' },
    },
    args: {
        columns: sampleColumns,
        data: sampleData,
        searchable: true,
        filterable: false,
        selectable: false,
        expandable: false,
        striped: true,
        hoverable: true,
        bordered: false,
        pageSize: 10,
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-advanced-datatable 
        [columns]="columns" 
        [data]="data"
        [searchable]="searchable"
        [filterable]="filterable"
        [selectable]="selectable"
        [expandable]="expandable"
        [striped]="striped"
        [hoverable]="hoverable"
        [bordered]="bordered"
        [pageSize]="pageSize">
      </sn-advanced-datatable>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnAdvancedDatatableComponent>;

export const Default: Story = {};

export const WithFilters: Story = {
    args: { filterable: true },
};

export const WithSelection: Story = {
    args: { selectable: true },
};

export const WithExpansion: Story = {
    args: { expandable: true },
};

export const FullFeatured: Story = {
    args: {
        searchable: true,
        filterable: true,
        selectable: true,
        expandable: true,
        bordered: true,
    },
};
