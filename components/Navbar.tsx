'use client';
import { CalendarCheck2, Search } from 'lucide-react';
import { Button } from './ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogin = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const isAuthorized = pathname === '/auth';

  return (
    <nav className='bg-white flex items-center justify-between py-3 px-4 '>
      <div className='relative flex items-center w-1/3'>
        <div className='relative flex items-center w-full'>
          <input
            type='text'
            placeholder='Search...'
            className='w-full px-4 py-2 rounded-md shadow-sm bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <Search className='w-5 h-5 text-slate-300' />
          </div>
        </div>
      </div>
      <div className='flex items-center justify-end'>
        {!isAuthorized && (
          <Button variant='default' onClick={handleLogin}>
            Sign Out
          </Button>
        )}
      </div>
    </nav>
  );
}
