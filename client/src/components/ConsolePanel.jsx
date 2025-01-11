import React from 'react';
import { Trash } from 'lucide-react';

const ConsolePanel = ({ consoleLogs, setConsoleLogs, consoleContainerRef, isDark }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 bg-white dark:bg-neutral-800 shadow-md dark:shadow-neutral-900">
        <h2 className="text-sm text-neutral-600 dark:text-neutral-400 font-semibold">Console</h2>
        <button
          className='p-1 text-red-500 dark:text-red-400 transition-opacity hover:opacity-70 active:opacity-30'
          onClick={() => setConsoleLogs([])}
        >
          <Trash size={16} />
        </button>
      </div>

      <div
        ref={consoleContainerRef}
        className="flex-1 p-2 overflow-y-auto text-sm bg-white dark:bg-neutral-800 shadow-inner"
      >
        {consoleLogs.map((log, index) => (
          <div
            key={index}
            className={`mb-1 ${log.method === 'error'
              ? 'text-red-500 dark:text-red-400'
              : log.method === 'warn'
                ? 'text-yellow-500 dark:text-yellow-400'
                : log.method === 'info'
                  ? 'text-blue-500 dark:text-blue-400'
                  : log.method === 'debug'
                    ? 'text-purple-500 dark:text-purple-400'
                    : 'text-neutral-700 dark:text-neutral-300'
              }`}
          >
            <span className="font-semibold"></span>{' '}
            {log.args.map((arg, i) => (
              <span key={i}>{JSON.stringify(arg)} </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsolePanel;