import { create } from 'zustand';

export type ILog = {
  note: string;
  hour: number;
  date: Date | string
}; 

interface LogState {
  log: ILog;
  logs: {
    [key: string]: ILog;
  };
  setDate: (date: Date) => void;
  setLog: (log: ILog) => void;
  setLogs: (log: ILog, key: string) => void;
  //he void keyword is  used to indicate that a function does not return a value
  //It is used as a return type for functions that perform some action but do not produce a result.
}

export const useLogStore = create<LogState>()((set) => ({
  log: {
    note: '',
    hour: 0,
    date: new Date(),
  },
  logs: {},
  setDate: (date: Date) => set((state) => ({ log: { ...state.log, date } })),
  setLog: (log: ILog) => set((state) => ({ log: { ...state.log, ...log } })),
  setLogs: (log: ILog, key: string) =>
    set((state) => {
      const updateLog = { ...state.logs, [key]: log };
      const sortedKeys = Object.keys(updateLog).sort();
      const sortObject: {
        [key: string]: ILog;
      } = {};

      for (const key of sortedKeys) {
        sortObject[key] = updateLog[key];
      }
      return {logs: sortObject};
    }),
}));
