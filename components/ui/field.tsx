import {Field as HeadlessField, FieldProps} from "@headlessui/react";
import {cn} from "@/lib/utilities";

export default function Filed(props: FieldProps) {
  return <HeadlessField {...props} className={cn('flex flex-col', props.className)} >{props.children}</HeadlessField>
}