import type { Meta, StoryObj } from '@storybook/angular';
import { SnModalComponent } from './sn-modal.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnModalComponent> = {
    title: 'Components/Modal',
    component: SnModalComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        open: { control: 'boolean', description: 'Whether the modal is open' },
        title: { control: 'text', description: 'The title of the modal' },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', 'full'],
            description: 'The size of the modal',
        },
        closeOnBackdrop: { control: 'boolean', description: 'Whether to close the modal when the backdrop is clicked' },
        closed: { action: 'closed', description: 'Event emitted when the modal is closed' },
    },
    args: {
        open: false,
        title: 'Modal Title',
        size: 'md',
        closeOnBackdrop: true,
    },
    render: (args: any) => ({
        props: args,
        template: `
      <div>
        <button (click)="open = true" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Open Modal
        </button>
        <sn-modal 
          [open]="open" 
          [title]="title" 
          [size]="size" 
          [closeOnBackdrop]="closeOnBackdrop"
          (closed)="open = false; closed()">
          <div style="padding: 16px;">
            <p>This is the content of the modal. You can place any content here.</p>
            <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px;">
              <button (click)="open = false" style="padding: 8px 16px; background: #eee; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
              <button (click)="open = false" style="padding: 8px 16px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Confirm</button>
            </div>
          </div>
        </sn-modal>
      </div>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnModalComponent>;

export const Default: Story = {};

export const Small: Story = {
    args: {
        size: 'sm',
        title: 'Small Modal',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        title: 'Large Modal',
    },
};

export const ExtraLarge: Story = {
    args: {
        size: 'xl',
        title: 'Extra Large Modal',
    },
};

export const FullScreen: Story = {
    args: {
        size: 'full',
        title: 'Full Screen Modal',
    },
};
