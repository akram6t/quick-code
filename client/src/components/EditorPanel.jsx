import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
// import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import CustomTab from './CustomTab';
import { Code, Minus, Plus } from 'lucide-react';

const EditorPanel = ({ isDark, html, setHtml, css, setCss, js, setJs }) => {
  const [active, setActive] = useState('html');
  const [fontSize, setFontSize] = useState(16);

  // set stored fontsize
  useEffect(() => {
    const fontSize = localStorage.getItem('editor-font-size');
    if (fontSize) {
      setFontSize(parseInt(fontSize));
    }
  }, []);

  const handleIncreaseFontSize = () => {
    if (fontSize < 30) {
      setFontSize(prev => {
        localStorage.setItem('editor-font-size', prev + 1);
        return prev + 1;
      });
    }
  }

  const handleDecreaseFontSize = () => {
    if (fontSize > 5) {
      setFontSize(prev => {
        localStorage.setItem('editor-font-size', prev - 1);
        return prev - 1;
      });
    }
  }

  // const [panelSizes, setPanelSizes] = useState({
  //   html: 96,
  //   css: 3,
  //   js: 3,
  // });

  // const [renderKey, setRenderKey] = useState(0);

  // const onPanelFocus = (panel) => {

  // If current panel size is > 40, collapse it to 3
  // if (panelSizes[panel] > 50) {
  // setPanelSizes({
  // html: 97/2,
  // css: 97/2,
  // js: 97/2,
  // [panel]: 3,
  // });
  // }else{
  // setPanelSizes({
  // html: 3,
  // css: 3,
  // js: 3,
  // [panel]: 94,
  // }); 
  // }

  // setRenderKey(prev => prev + 1);
  // };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {/* <PanelGroup direction="horizontal" key={renderKey}> */}
        {/* HTML Editor */}
        {/* <Panel className='transition duration-300' */}
        {/* defaultSize={panelSizes.html} */}
        {/* minSize={3} */}
        {/* > */}
        <div className='flex items-center pe-3 bg-white dark:bg-neutral-800'>

          {/* tabs */}
          <div className='flex-1 flex items-center bg-white dark:bg-neutral-800 space-x-1'>
            <CustomTab
              id={'html'}
              label={'HTML'}
              icon={'html'}
              isDark
              activeTab={active}
              setActiveTab={setActive}
            />
            <CustomTab
              id={'css'}
              label={'CSS'}
              icon={'css'}
              isDark
              activeTab={active}
              setActiveTab={setActive}
            />
            <CustomTab
              id={'javascript'}
              label={'JAVASCRIPT'}
              icon={'js'}
              isDark
              activeTab={active}
              setActiveTab={setActive}
            />
          </div>

          {/* font sizes */}
          <div className='flex items-center space-x-1'>
            <button onClick={handleDecreaseFontSize} className='border border-neutral-400 rounded-full p-1 transition-opacity hover:opacity-70 active:opacity-40'> <Minus size={14} /> </button>
            <span>{fontSize}</span>
            <button onClick={handleIncreaseFontSize} className='border border-neutral-400 rounded-full p-1 transition-opacity hover:opacity-70 active:opacity-40'> <Plus size={14} /> </button>
          </div>

        </div>
        {/* <div>
          <button className="p-2 transition-opacity hover:opacity-80 active:opacity-60" onClick={() => onPanelFocus('html')}>
            <img src="/html-5.png" className="w-5 h-5" alt="HTML" />
          </button>
          <button className="p-2 transition-opacity hover:opacity-80 active:opacity-60" onClick={() => onPanelFocus('html')}>
            <img src="/css-3.png" className="w-5 h-5" alt="HTML" />
          </button>
          <button className="p-2 transition-opacity hover:opacity-80 active:opacity-60" onClick={() => onPanelFocus('html')}>
            <img src="/js.png" className="w-5 h-5" alt="HTML" />
          </button>
        </div> */}
        <Editor
          height="100%"
          theme={isDark ? 'vs-dark' : 'vs-light'}
          language={active}
          value={active === 'html' ? html : active === 'css' ? css : js}
          onChange={(value) => active === 'html' ? setHtml(value) : active === 'css' ? setCss(value) : setJs(value)}
          options={{
            minimap: { enabled: false },
            fontSize: fontSize,
            wordWrap: 'off',
            scrollBeyondLastColumn: 5,
            automaticLayout: true,
            padding: { top: 7 },
            overviewRulerBorder: false,
          }}
        />
        {/* </Panel> */}
        {/* <PanelResizeHandle className="w-1 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-colors" /> */}
        {/* CSS Editor */}
        {/* <Panel className='transition duration-300' */}
        {/* defaultSize={panelSizes.css} */}
        {/* minSize={3} */}
        {/* > */}
        {/* <button className="p-2 transition-opacity hover:opacity-80 active:opacity-60" onClick={() => onPanelFocus('css')}> */}
        {/* <img src="/css-3.png" className="w-5 h-5" alt="CSS" /> */}
        {/* </button> */}
        {/* <Editor */}
        {/* height="100%" */}
        {/* theme={isDark ? 'vs-dark' : 'vs-light'} */}
        {/* language="css" */}
        {/* value={css} */}
        {/* onChange={(value) => setCss(value || '')} */}
        {/* options={{ */}
        {/* minimap: { enabled: false }, */}
        {/* fontSize: 14, */}
        {/* wordWrap: 'off', */}
        {/* scrollBeyondLastColumn: 5, */}
        {/* automaticLayout: true, */}
        {/* padding: { top: 7 }, */}
        {/* overviewRulerBorder: false, */}
        {/* }} */}
        {/* /> */}
        {/* </Panel> */}
        {/* <PanelResizeHandle className="w-1 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-colors" /> */}
        {/* JavaScript Editor */}
        {/* <Panel className='transition duration-300'
            defaultSize={panelSizes.js}
            minSize={3}
          >
            <button className="p-2 transition-opacity hover:opacity-80 active:opacity-60" onClick={() => onPanelFocus('js')}>
              <img src="/js.png" className="w-5 h-5" alt="JavaScript" />
            </button>
            <Editor
              height="100%"
              theme={isDark ? 'vs-dark' : 'vs-light'}
              language="javascript"
              value={js}
              onChange={(value) => setJs(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'off',
                scrollBeyondLastColumn: 5,
                automaticLayout: true,
                padding: { top: 7 },
                overviewRulerBorder: false,
              }}
            />
          </Panel> */}
        {/* </PanelGroup> */}
      </div>
    </div>
  );
};

export default EditorPanel;