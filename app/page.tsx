import Calendar from '@/components/Calendar';
import Logs from '@/components/Logs';
import Navbar from '@/components/Navbar';
import { NewLog } from '@/components/NewLog';
import InitLog from '@/components/state/initLog';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ILog } from './store';

export const dynamic = 'force-dynamic';

export default async function page() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();
  console.log(data);

  if (!data.session) {
    return redirect('/auth');
  }

  const { data: logs } = await supabase
    .from('logs')
    .select('*')
    .order('date', { ascending: true });

  console.log(logs)

  return (
    <main className='p-5 space-y-10'>
      <InitLog logs={logs as ILog[]} />
      <Navbar />
      <div className='flex items-center justify-start'>
        <h1 className='text-3xl sm:text-3xl md:text-3xl lg:text-4xl text-[#292929] font-medium tracking-tighter'>
          Dashboard
        </h1>
      </div>
      <NewLog />
      <Calendar />
      <Logs />
    </main>
  );
}
