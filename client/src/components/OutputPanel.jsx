import React from 'react';
import { Play, Share } from 'lucide-react';
// import { useNavigation } from 'react-router';

const OutputPanel = ({ output, iframeKey, reRunIframe }) => {
  // const navigate = useNavigation();

  // const runInfullScreen = () => {
  // navigate('/preview', {  })
  // }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 bg-white dark:bg-neutral-800 shadow-md dark:shadow-neutral-900">
        <h2 className="text-sm text-neutral-600 dark:text-neutral-400 font-semibold">Output</h2>
        <div className='flex items-center space-x-1'>
          <a href='/preview' target='_blank'
            className='p-1 text-blue-700 dark:text-blue-400 transition-opacity hover:opacity-70 active:opacity-30'
            // onClick={runInfullScreen}
          >
            <Share size={16} />
          </a>
          <button
            className='p-1 text-blue-700 dark:text-blue-400 transition-opacity hover:opacity-70 active:opacity-30'
            onClick={reRunIframe}
          >
            <Play size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 shadow-inner bg-white dark:bg-neutral-800">
        <iframe
          key={iframeKey}
          title="output"
          srcDoc={output}
          className="w-full h-full bg-white dark:bg-neutral-800 rounded-lg"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
};

export default OutputPanel;