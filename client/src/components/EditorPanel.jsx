import React, { useEffect, useState } from 'react';
import SimpleEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css'; // Default light theme
import 'prism-themes/themes/prism-dracula.css'; // Dracula theme for dark mode
import { Minus, Plus } from 'lucide-react';
import CustomTab from './CustomTab';

const EditorPanel = ({ isDark, html, setHtml, css, setCss, js, setJs }) => {
  const [active, setActive] = useState('html');
  const [fontSize, setFontSize] = useState(16);

  // Set stored font size
  useEffect(() => {
    const fontSize = localStorage.getItem('editor-font-size');
    if (fontSize) {
      setFontSize(parseInt(fontSize));
    }
  }, []);

  // Dynamically apply the dark theme class to the body
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  const handleIncreaseFontSize = () => {
    if (fontSize < 30) {
      setFontSize((prev) => {
        localStorage.setItem('editor-font-size', prev + 1);
        return prev + 1;
      });
    }
  };

  const handleDecreaseFontSize = () => {
    if (fontSize > 5) {
      setFontSize((prev) => {
        localStorage.setItem('editor-font-size', prev - 1);
        return prev - 1;
      });
    }
  };

  // Determine the current value and language based on the active tab
  const currentValue = active === 'html' ? html : active === 'css' ? css : js;
  const currentLanguage = active === 'html' ? 'markup' : active === 'css' ? 'css' : 'javascript';

  const handleValueChange = (value) => {
    if (active === 'html') setHtml(value);
    else if (active === 'css') setCss(value);
    else if (active === 'javascript') setJs(value);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="flex items-center pe-3 bg-white dark:bg-neutral-800">
          {/* Tabs */}
          <div className="flex-1 flex items-center bg-white dark:bg-neutral-800 space-x-1">
            <CustomTab
              id={'html'}
              label={'HTML'}
              icon={'html'}
              isDark={isDark}
              activeTab={active}
              setActiveTab={setActive}
            />
            <CustomTab
              id={'css'}
              label={'CSS'}
              icon={'css'}
              isDark={isDark}
              activeTab={active}
              setActiveTab={setActive}
            />
            <CustomTab
              id={'javascript'}
              label={'JAVASCRIPT'}
              icon={'js'}
              isDark={isDark}
              activeTab={active}
              setActiveTab={setActive}
            />
          </div>

          {/* Font size controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleDecreaseFontSize}
              className="border border-neutral-400 rounded-full p-1 transition-opacity hover:opacity-70 active:opacity-40"
            >
              <Minus size={14} />
            </button>
            <span>{fontSize}</span>
            <button
              onClick={handleIncreaseFontSize}
              className="border border-neutral-400 rounded-full p-1 transition-opacity hover:opacity-70 active:opacity-40"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Simple Editor */}
        <SimpleEditor
          value={currentValue}
          onValueChange={handleValueChange}
          highlight={(code) => highlight(code, languages[currentLanguage])}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: fontSize,
            backgroundColor: isDark ? '#282a36' : '#f5f5f5', // Dracula background for dark, light background for light
            color: isDark ? '#f8f8f2' : '#333', // Dracula text for dark, dark text for light
            minHeight: '100%',
            borderRadius: '4px',
            border: isDark ? '1px solid #44475a' : '1px solid #ddd', // Dracula border for dark, light border for light
          }}
          placeholder={`Enter ${active.toUpperCase()} code...`}
        />
      </div>
    </div>
  );
};

export default EditorPanel;