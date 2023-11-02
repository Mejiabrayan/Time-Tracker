import Link from 'next/link';

import SidebarItem from './Sidebar-Items';
import { CalendarCheck2 } from 'lucide-react';

export default function Sidebar() {
  return (
    <>
      <div className='flex rounded h-full max-h-[69px] w-full bg-[#f9fafb] items-center p-4'>
        <Link
          href={'/'}
          className='flex items-center gap-2 text-[#292929] text-xl font-semibold'
        >
          <CalendarCheck2 className='w-6 h-6' />
          Time Log
        </Link>
      </div>
      <div className='mt-6'>
        <SidebarItem />
      </div>
    </>
  );
}
