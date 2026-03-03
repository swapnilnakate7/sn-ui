import type { Meta, StoryObj } from '@storybook/angular';
import { SnAvatarComponent } from './sn-avatar.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<SnAvatarComponent> = {
    title: 'Components/Avatar',
    component: SnAvatarComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule],
        }),
    ],
    argTypes: {
        src: { control: 'text', description: 'Image URL' },
        alt: { control: 'text', description: 'Alt text for the image' },
        initials: { control: 'text', description: 'Fallback text (e.g. "JD")' },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl'],
            description: 'Dimensions of the avatar',
        },
        shape: {
            control: 'select',
            options: ['circle', 'square', 'rounded'],
            description: 'Border radius style',
        },
        bgColor: { control: 'color', description: 'Background color for initials' },
        textColor: { control: 'color', description: 'Text color for initials' },
    },
    args: {
        size: 'md',
        shape: 'circle',
    },
    render: (args: any) => ({
        props: args,
        template: `
      <sn-avatar 
        [src]="src" 
        [alt]="alt" 
        [initials]="initials" 
        [size]="size" 
        [shape]="shape" 
        [bgColor]="bgColor" 
        [textColor]="textColor">
      </sn-avatar>
    `,
    }),
};

export default meta;
type Story = StoryObj<SnAvatarComponent>;

export const WithImage: Story = {
    args: {
        src: 'https://i.pravatar.cc/150?img=68',
        alt: 'Profile Picture',
        size: 'lg',
    },
};

export const WithInitials: Story = {
    args: {
        initials: 'JD',
        bgColor: '#3b82f6',
        textColor: '#ffffff',
        size: 'md',
    },
};

export const SquareShape: Story = {
    args: {
        src: 'https://i.pravatar.cc/150?img=33',
        shape: 'square',
        size: 'xl',
    },
};

export const SmallRounded: Story = {
    args: {
        initials: 'AB',
        shape: 'rounded',
        size: 'sm',
    },
};
