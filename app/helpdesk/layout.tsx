import {ReactNode} from "react";
import HelpdeskSideNavigation from "@/components/navigation/helpdesk-side-navigation";

export default function Layout({children}: { children: ReactNode }) {
  return (
    <div className='flex p-2'>
      <HelpdeskSideNavigation />
      <main className='flex-1 m-4'>
        {children}
      </main>
    </div>
  );
}