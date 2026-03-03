import type { Meta, StoryObj } from '@storybook/angular';
import { SnCardComponent } from './sn-card.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnCardComponent> = {
    title: 'Components/Card',
    component: SnCardComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        title: { control: 'text', description: 'The title of the card' },
    },
    args: {
        title: 'Card Title',
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-card [title]="title">
        <div style="padding: 16px;">
          This is the content of the card. You can put any HTML here.
        </div>
      </sn-card>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnCardComponent>;

export const Default: Story = {
    args: {
        title: 'Card Title',
    },
};

export const WithoutTitle: Story = {
    args: {
        title: undefined,
    },
};

export const ComplexContent: Story = {
    render: (args: any) => ({
        props: args,
        template: `
      <sn-card title="Profile Card">
        <div style="padding: 16px; display: flex; align-items: center; gap: 16px;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #eee; display: flex; align-items: center; justify-content: center;">
            JD
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.1rem;">John Doe</h3>
            <p style="margin: 0; color: #666; font-size: 0.9rem;">Software Engineer</p>
          </div>
        </div>
        <div style="padding: 0 16px 16px;">
          <button style="width: 100%; padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Follow
          </button>
        </div>
      </sn-card>
    `,
    }),
};
