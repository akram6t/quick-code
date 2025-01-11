import { useEffect, useState } from "react";
import { ThemeSwitch } from "../components/ThemeSwitch";
import { combinedOutput, DEFAULT_HTML } from "../data";
import { useStore, useTheme } from "../zustand/store";

export default function PreviewPage() {
    const [iframeKey, setIframeKey] = useState(0);
    const { isDark, setIsDark } = useTheme();
    const { html, css, js } = useStore();
    const [output, setOutput] = useState(DEFAULT_HTML);

    useEffect(() => {
        const html = localStorage.getItem('html') || DEFAULT_HTML;
        const css = localStorage.getItem('css') || '';
        const js = localStorage.getItem('js') || '';
        if (html) {
            setOutput(combinedOutput({ html, css, js, isDark }));
        }
        reRunIframe();
    }, [isDark]);

    useEffect(() => {
        // console.log(html);

    }, []);

    // Force the iframe to re-render by updating its key
    const reRunIframe = () => {
        setIframeKey((prevKey) => prevKey + 1);
    };

    return (
        <main className="min-h-screen flex">
            <span className="fixed left-10 bottom-10">
                <ThemeSwitch onChange={(theme) => {
                    setIsDark(theme === 'dark')
                }
                } />
            </span>
            <div className="flex-1 shadow-inner bg-red-700 dark:bg-neutral-800">
                <iframe
                    key={iframeKey}
                    title="output"
                    srcDoc={output}
                    className="w-full h-full bg-white dark:bg-neutral-800 rounded-lg"
                    sandbox="allow-scripts"
                />
            </div>

        </main>
    )
}