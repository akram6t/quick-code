import { create } from 'zustand'
import { DEFAULT_HTML } from '../data';
// import { DEFAULT_HTML } from '../data'

export const useStore = create((set) => ({
    // isDark: false,
    html: DEFAULT_HTML,
    css: '',
    js: '',
    setHtml: html => set({ html }),
    setCss: css => set({ css }),
    setJs: js => set({ js }),
    // setIsDark: value => set({ isDark: value }),
    // setOutput: value => set({ output: value })
    // setHtml: (value) => set(_ => ({ html: value })),
    // setCss: (value) => set(_ => ({ css: value })),
    // setJs: (value) => set(_ => ({ js: value })),
}));

export const useTheme = create((set) => ({
    isDark: false,
    // output: '',
    setIsDark: value => set({ isDark: value }),
    // setOutput: value => set({ output: value })
    // setHtml: (value) => set(_ => ({ html: value })),
    // setCss: (value) => set(_ => ({ css: value })),
    // setJs: (value) => set(_ => ({ js: value })),
}));