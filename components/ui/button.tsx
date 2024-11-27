import {Button as HeadlessButton, ButtonProps as HeadlessButtonProps} from "@headlessui/react";
import {cn} from "@/lib/utilities";
import {cva, type VariantProps} from 'class-variance-authority'

const variants = cva([
  'py-2 px-4 rounded-lg font-medium tracking-tight transition duration-100 data-[disabled]:cursor-not-allowed'
], {
  variants: {
    variant: {
      primary: [
        'bg-teal-400 text-neutral-950 border border-teal-400 data-[hover]:bg-teal-500 data-[hover]:border-teal-500',
        'data-[active]:scale-95 data-[disabled]:bg-teal-300 data-[disabled]:border-teal-300 data-[disabled]:text-neutral-600'
      ],
      secondary: ''
    },
    size: {
      default: '',
      sm: '',
      lg: ''
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
})

interface ButtonProps extends HeadlessButtonProps, VariantProps<typeof variants> {
}

export default function Button({className, variant, size, ...props}: ButtonProps) {
  return (
    <HeadlessButton
      {...props}
      className={cn(variants({variant, size, className}))}
    >
      {props.children}
    </HeadlessButton>
  );
}