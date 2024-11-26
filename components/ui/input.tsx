import {Input as HeadlessInput, InputProps} from "@headlessui/react";
import {cn} from "@/lib/utilities";

export default function Input(props: InputProps) {
  return <HeadlessInput {...props} className={cn('bg-transparent rounded-lg placeholder-neutral-600 caret-neutral-100 font-light border-neutral-100', props.className)} />
}