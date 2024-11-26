import {Select as HeadlessSelect, SelectProps} from "@headlessui/react";
import {cn} from "@/lib/utilities";

export default function Select(props: SelectProps){
  return <HeadlessSelect {...props} className={cn('bg-transparent rounded-lg placeholder-neutral-600 caret-neutral-100 font-light border-neutral-100', props.className)} >{props.children}</HeadlessSelect>
}