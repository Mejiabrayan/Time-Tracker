'use client'

import { ILog, useLogStore } from '@/app/store';
import React, { useRef } from 'react';
import dayjs from 'dayjs';

export default function InitLog({ logs }: { logs: ILog[] }) {
  const initRef = useRef<boolean>();

  const prepareLog = () => {
    const result: {
      [key: string]: ILog;
    } = {};

    logs.forEach((log) => {
      // Add a condition to exclude logs that have been deleted
      if (log.date) {
        result[dayjs(log.date).format('YYYY-MM-DD')] = log;
      }
    });

    return result;
  };

  if (!initRef.current) {
    useLogStore.setState({
      logs: prepareLog(),
    });
    initRef.current = true;
  }

  return null;
}