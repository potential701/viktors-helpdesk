import {Textarea as HeadlessTextarea, TextareaProps} from "@headlessui/react";
import {cn} from "@/lib/utilities";

export default function Textarea(props: TextareaProps) {
  return <HeadlessTextarea {...props} className={cn('bg-transparent rounded-lg placeholder-neutral-600 caret-neutral-100 font-light border-neutral-100', props.className)} />
}