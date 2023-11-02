'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { DatePicker } from './DatePicker';

import { useLogStore } from '@/app/store';
import { useToast } from './ui/use-toast';
import dayjs from 'dayjs';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function NewLog() {
  const supabase = createClientComponentClient();

  const { toast } = useToast();

  const log = useLogStore((state) => state.log);
  const setLog = useLogStore((state) => state.setLog);
  const setLogs = useLogStore((state) => state.setLogs);

  // This function validates our logs
  const validateLog = () => {
    if (!log.date || !log.hour || log.hour === 0) {
      throw 'Date or Hour can not be empty';
    } else if (log.hour >= 24) {
      throw 'Please enter a valid hour';
    }
  };

  const CloseButtonDialog = () => {
    document.getElementById('close-btn')?.click();
  };

  // There has to be a better way to do this 😅

  const submitLog = async () => {
    try {
      validateLog();
      const date = log.date as Date;
      const { error } = await supabase
        .from('logs')
        .upsert({ ...log, date: dayjs(log.date).format('YYYY-MM-DD') })
        .select('*')
        .single();

      if (!error) {
        setLogs(log, dayjs(date).format('YYYY-MM-DD'));
        toast({
          title: 'Successfully created a log 🎉',
          description: `${log.hour} in ${date.toDateString()}`,
          variant: 'default',
        });
        setLog({ note: '', hour: 0, date: '' }); // Clear the log
        CloseButtonDialog();
      } else {
        toast({
          variant: 'destructive',
          title: 'Fail to create log',
          description: error.message,
        });
      }
    } catch (e) {
      toast({
        title: 'Fail to create log',
        description: e as string,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>
          Enter Logs <Plus className='h-4 w-4 ml-1' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create Log</DialogTitle>
          <DialogDescription>
            {
              'Remember, time is your most valuable asset - invest it wisely with our Time Log App!'
            }{' '}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='hour' className='text-right'>
              Date
            </Label>
            <DatePicker />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='hour' className='text-right'>
              Hour
            </Label>
            <Input
              id='hour'
              type='number'
              className='col-span-3'
              value={log.hour}
              onChange={(e) =>
                setLog({
                  ...log,
                  hour: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Note
            </Label>
            <Input
              id='note'
              placeholder='note the log'
              className='col-span-3'
              value={log.note}
              onChange={(e) =>
                setLog({
                  ...log,
                  note: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={() => {
              submitLog();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
