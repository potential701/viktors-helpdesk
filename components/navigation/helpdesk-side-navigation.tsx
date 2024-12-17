import Link from "next/link";
import Button from "@/components/ui/button";
import {cn} from "@/lib/utilities";
import {headers} from "next/headers";
import {getUser} from "@/lib/user";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import CreateNewIssueDialog from "@/app/helpdesk/create-new-issue-dialog";
import axios from "axios";
import {Category} from "@/lib/types";

const navigation = [
  {
    name: 'My Tickets',
    links: [
      {
        name: 'Assigned to Me',
        href: '/helpdesk/assigned'
      },
      {
        name: 'Created by Me',
        href: '/helpdesk/created'
      }
    ]
  },
  {
    name: 'Other Tickets',
    links: [
      {
        name: 'All Unassigned',
        href: '/helpdesk'
      },
      {
        name: 'All Tickets',
        href: '/helpdesk/all'
      }
    ]
  }
]

export default async function HelpdeskSideNavigation() {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path');
  const user = await getUser();
  const categoriesResponse = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/category/read');
  const categories = categoriesResponse.data as Category[];

  return (
    <aside className='w-full max-w-56 bg-neutral-100/5 min-h-screen p-4 rounded-lg shadow-lg'>
      <div className='flex'>
        <Menu>
          <MenuButton
            className='flex flex-row justify-between items-center w-full px-4 py-2 data-[hover]:bg-neutral-100/5 data-[active]:bg-neutral-100/5 rounded-lg'>
          <span className='inline-flex items-center gap-x-2 text-xs'>
            <UserCircleIcon className='size-5'/>
            {user.username}
          </span>
            <ChevronDownIcon className='size-3'/>
          </MenuButton>
          <MenuItems anchor='bottom start' className='bg-neutral-100/5 backdrop-blur w-48 rounded-lg p-2 mt-0.5'>
            <MenuItem>
              <Link href={'/auth/logout'} passHref>
                <Button variant='ghost' className='w-full text-start text-sm'>Log Out</Button>
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
        <CreateNewIssueDialog user={user} categories={categories} />
      </div>
      <nav className='divide-y divide-neutral-600 mt-2'>
        {navigation.map((item) => (
          <ul key={item.name} className='even:pt-4 odd:pb-4 space-y-0.5'>
            <small className='text-xs font-medium tracking-tighter mb-2 inline-flex'>{item.name}</small>
            {item.links.map((link) => (
              <li key={link.name}>
                <Link href={link.href} passHref>
                  <Button
                    variant='ghost'
                    className={cn(
                      'w-full text-start text-sm',
                      pathname === link.href && 'bg-neutral-100/5'
                    )}>
                    {link.name}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </nav>
    </aside>
  );
}