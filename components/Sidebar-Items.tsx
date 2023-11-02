'use client';

import { useMemo } from 'react';
import Link from 'next/link';

import { Icons } from './icons';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SidebarItem({ ...props }) {
  const pathName = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const tabs = useMemo(() => {
    return [
      {
        name: 'Home',
        href: '/',
        isActive: pathName === '/',
        icon: <Icons.home width={18} className='fill-zinc-300 text-gray-500' />,
      },
      {
        name: 'Logs',
        href: '/logs',
        isActive: pathName === '/logs',
        icon: <Icons.star width={18} />,
      },
    ];
  }, [pathName]);
  return (
    <ul className='flex flex-col gap-1 px-2'>
      {tabs.map(({ name, href, isActive, icon }) => (
        <li key={name}>
          <Link
            href={href}
            {...props}
            className={`flex items-center space-x-2 rounded-lg px-2 py-1 transition-all duration-150 ease-in-out ${
              isActive ? 'text-gray-600 bg-[#e4e7eb]' : ''
            }`}
          >
            <span className=' text-gray-500 flex h-8 items-center gap-2 rounded-md px-2 text-[1.rem]'>
              {icon}
              {name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
