import { redirect } from 'next/navigation';
import AuthComponent from './components/AuthComponent';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';


export const dynamic = "force-dynamic";

export default async function page() {
	const supabase = createServerComponentClient({ cookies });

	const { data } = await supabase.auth.getSession();

	if (data.session) {
		return redirect("/");
	}

	return <AuthComponent />;
}