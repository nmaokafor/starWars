import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginParent from './pages/Home/LoginParent';

import './App.scss';

function App() {
  return (
    <div className="">
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginParent />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
