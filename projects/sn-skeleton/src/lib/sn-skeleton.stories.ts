import type { Meta, StoryObj } from '@storybook/angular';
import { SnSkeletonComponent } from './sn-skeleton.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnSkeletonComponent> = {
    title: 'Components/Skeleton',
    component: SnSkeletonComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'circle', 'rectangle'],
            description: 'The structural shape of the skeleton',
        },
        animation: {
            control: 'select',
            options: ['pulse', 'wave', 'none'],
            description: 'Motion effect applied to the element',
        },
        width: { control: 'text', description: 'Width of the skeleton (e.g. "100%", "4rem")' },
        height: { control: 'text', description: 'Height of the skeleton (e.g. "1rem", "100px")' },
        customClass: { control: 'text', description: 'Additional CSS classes to apply' },
    },
    args: {
        type: 'text',
        animation: 'pulse',
        width: '100%',
        height: '1rem',
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-skeleton 
        [type]="type" 
        [animation]="animation" 
        [width]="width" 
        [height]="height" 
        [customClass]="customClass">
      </sn-skeleton>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnSkeletonComponent>;

export const TextPulse: Story = {
    args: {
        type: 'text',
        animation: 'pulse',
        width: '80%',
        height: '1rem',
    },
};

export const CircleWave: Story = {
    args: {
        type: 'circle',
        animation: 'wave',
        width: '4rem',
        height: '4rem',
    },
};

export const RectangleNone: Story = {
    args: {
        type: 'rectangle',
        animation: 'none',
        width: '100%',
        height: '8rem',
    },
};

export const ProfileCardExample: Story = {
    render: (args: any) => ({
        props: args,
        template: `
      <div style="display: flex; gap: 1rem; align-items: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; max-width: 400px;">
        <sn-skeleton type="circle" width="3rem" height="3rem" animation="pulse"></sn-skeleton>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
          <sn-skeleton type="text" width="60%" height="1rem" animation="pulse"></sn-skeleton>
          <sn-skeleton type="text" width="40%" height="1rem" animation="pulse"></sn-skeleton>
        </div>
      </div>
    `,
    }),
};
