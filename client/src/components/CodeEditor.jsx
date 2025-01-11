import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { ThemeSwitch } from './ThemeSwitch';
import { combinedOutput, DEFAULT_HTML } from '../data';
import EditorPanel from './EditorPanel';
import OutputPanel from './OutputPanel';
import ConsolePanel from './ConsolePanel';
import { useStore, useTheme } from '../zustand/store';

const CodeEditor = () => {
    const [consoleLogs, setConsoleLogs] = useState([]);
    const [iframeKey, setIframeKey] = useState(0);
    const consoleContainerRef = useRef(null);
    const [output, setOutput] = useState('');
    const { html, css, js, setHtml, setCss, setJs } = useStore();
    const { isDark, setIsDark } = useTheme();

    // Memoize the onChange function
    const handleThemeChange = useCallback((theme) => {
        setIsDark(theme === 'dark');
    }, [setIsDark]);

    // Capture console logs and errors from the iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'console') {
                setConsoleLogs((prevLogs) => [...prevLogs, event.data.message]);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Scroll to the bottom of the console container when new logs are added
    useEffect(() => {
        if (consoleContainerRef.current) {
            consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
        }
    }, [consoleLogs]);

    const updateOutput = () => {
        setOutput(combinedOutput({ html, css, js, isDark }));
    };

    // Force the iframe to re-render by updating its key
    const reRunIframe = () => {
        setIframeKey((prevKey) => prevKey + 1);
        setConsoleLogs([]);
    };

    // get code from localstorage
    useEffect(() => {
        const html = sessionStorage.getItem('html') || DEFAULT_HTML;
        const css = sessionStorage.getItem('css') || '';
        const js = sessionStorage.getItem('js') || '';
        setHtml(html);
        setCss(css);
        setJs(js);
    }, []);

    // Add a delay when updating the output
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            updateOutput()
            // for preview in another page
            localStorage.setItem('html', html);
            localStorage.setItem('css', css);
            localStorage.setItem('js', js);

            // for editor
            sessionStorage.setItem('html', html);
            sessionStorage.setItem('css', css);
            sessionStorage.setItem('js', js);
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [html, css, js, isDark]);

    return (
        <div className='h-screen flex flex-col'>
            <div className="bg-white dark:bg-neutral-800 shadow-lg dark:shadow-neutral-900 p-1 flex justify-between items-center">
                <h1 className="text-md font-bold">React Code Editor</h1>
                <ThemeSwitch onChange={handleThemeChange} />
            </div>

            <PanelGroup direction="horizontal">
                <Panel defaultSize={70} minSize={20}>
                    <EditorPanel
                        isDark={isDark}
                        html={html}
                        setHtml={setHtml}
                        css={css}
                        setCss={setCss}
                        js={js}
                        setJs={setJs}
                    />
                </Panel>

                <PanelResizeHandle className="w-1 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-colors" />

                <Panel defaultSize={30} minSize={20}>
                    <PanelGroup direction="vertical">
                        <Panel defaultSize={70} minSize={5}>
                            <OutputPanel output={output} iframeKey={iframeKey} reRunIframe={reRunIframe} isDark={isDark} />
                        </Panel>

                        <PanelResizeHandle className="h-1 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-colors" />

                        <Panel defaultSize={5} minSize={5}>
                            <ConsolePanel
                                consoleLogs={consoleLogs}
                                setConsoleLogs={setConsoleLogs}
                                consoleContainerRef={consoleContainerRef}
                                isDark={isDark}
                            />
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    );
};

export default CodeEditor;