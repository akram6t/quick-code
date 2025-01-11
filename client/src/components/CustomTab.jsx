import React, { useState } from 'react';
import { Code, Layout, Braces } from 'lucide-react';

const CustomTab = ({ id, label, icon, isDark, activeTab, setActiveTab }) => {
  // const Icon = { Code, Layout, Braces }[icon];
  const icons = {
    html: '/html-5.png',
    css: '/css-3.png',
    js: '/js.png'
  }

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`
        text-sm flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all duration-300
        ${activeTab === id
          ? 'dark:shadow-inner dark:text-blue-400 dark:border-blue-400 shadow-inner text-blue-600 border-t-2 border-l border-r border-blue-500'
          : 'dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 text-neutral-800 hover:bg-white hover:text-neutral-900'
        }
      `}
    >
      <img src={icons[icon]} className='w-5 h-5' />
      {label}
    </button>
  );
};


export default CustomTab;

function CustomTabs({ activeTab, setActiveTab }) {
  const [active, setActive] = useState(0);
  return (
    <div className='flex items-center'>
      <CustomTab />
    </div>
  )
}