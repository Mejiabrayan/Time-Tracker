'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { Github } from 'lucide-react';

export default function AuthComponent() {
  const supabase = createClientComponentClient();

  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <div className='p-5  min-h-screen flex flex-col justify-center items-center'>
      <div className='max-w-md w-full items-center justify-center flex'>
        <Card>
          <CardHeader>
            <CardTitle className='text-center'>Sign In</CardTitle>
          </CardHeader>
          {/* <CardContent>
            <input
              type='text'
              className='w-full p-2 border border-gray-300 rounded-md mb-4'
              placeholder='Username'
            />
            <input
              type='password'
              className='w-full p-2 border border-gray-300 rounded-md mb-4'
              placeholder='Password'
            />
          </CardContent> */}
        
          <CardFooter>
            <Button
              variant='default'
              onClick={handleLogin}
              className='flex items-center'
            >
              <Github size={16} className='mr-2' />
              Login With Github
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
