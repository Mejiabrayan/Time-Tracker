'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLogStore } from '@/app/store';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export default function Logs() {
  const logs = useLogStore((state) => state.logs);

  return (
    <div className='p-4'>
      <Table className='min-w-full'>
        <TableCaption className='text-center font-semibold text-lg pb-4'>
          List of Logs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-1/4'>Date</TableHead>
            <TableHead className='w-1/4'>Hour</TableHead>
            <TableHead className='w-1/4'>Note</TableHead>
            <TableHead className='w-1/4'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(logs).map((key) => {
            const log = logs[key];
            const date = log.date ? new Date(log.date) : null;

            const handleDelete = () => {
              useLogStore.getState().deleteLog(key);
            };

            return (
              <TableRow
                key={key}
                className={cn(log.hour <= 5 ? 'bg-transparent' : '')}
              >
                <TableCell> {date ? date.toDateString() : ''}</TableCell>
                <TableCell>{log.hour}</TableCell>
                <TableCell>{log.note}</TableCell>
                <TableCell className='text-center'>
                  <Button
                    variant='outline'
                    className='text-red-600 hover:text-red-800'
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
