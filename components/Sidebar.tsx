import Link from 'next/link';

import SidebarItem from './Sidebar-Items';
import { CalendarCheck2 } from 'lucide-react';

export default function Sidebar() {
  return (
    <>
      <div className='flex h-full max-h-[69px] w-full items-center border-b p-4'>
        <Link href={'/'} className='flex items-center gap-2'>
          <div className='flex items-center text-[#292929]'>
            <span className='text-xl font-semibold'>Time Log</span>
            </div>
        </Link>
      </div>
      <div className='mt-6'>
        <SidebarItem />
      </div>
    </>
  );
}
