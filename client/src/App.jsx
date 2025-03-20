import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router";
import PlaygroundPage from './pages/Playground';
import PreviewPage from './pages/Preview';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlaygroundPage/>} />
          <Route path="/preview" element={<PreviewPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
