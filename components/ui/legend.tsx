import {Legend as HeadlessLegend, LegendProps} from "@headlessui/react";
import {cn} from "@/lib/utilities";

export default function Legend(props: LegendProps){
  return <HeadlessLegend {...props} className={cn('text-4xl font-medium tracking-tight', props.className)} >{props.children}</HeadlessLegend>
}