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

  const handleLogin = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const tabs = useMemo(() => {
    return [
      {
        name: 'Dashboard',
        href: '/',
        isActive: pathName === '/',
        icon: <Icons.home width={18} />,
      },
    ];
  }, [pathName]);
  return (
    <ul className='flex flex-col gap-1 px-2'>
      {tabs.map(({ name, href, isActive, icon }) => (
        <li key={name}>
          <Link
            className={`flex items-center space-x-2 ${
              isActive ? 'text-slate-500' : ''
            } rounded-lg px-2 py-1 transition-all duration-150 ease-in-out  hover:bg-black/70 hover:text-white active:bg-secondary/40`}
            href={href}
            {...props}
          >
            <span className='bg-slate-6 text-slate-12 flex h-8 items-center gap-2 rounded-md px-2 text-sm'>
              {icon}
              {name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
