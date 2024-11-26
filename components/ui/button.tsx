import {Button as HeadlessButton, ButtonProps} from "@headlessui/react";
import {cn} from "@/lib/utilities";

export default function Button(props: ButtonProps){
  return <HeadlessButton {...props} className={cn('py-2 px-4 bg-neutral-100 text-neutral-900 rounded-lg border font-medium tracking-tight', props.className)}>{props.children}</HeadlessButton>
}