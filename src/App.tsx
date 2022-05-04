import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginParent from './pages/LoginPage/LoginParent';
import MainNavigation from './pages/NavigationPage/MainNavigation';

import './App.scss';

function App() {
  return (
    <div className="">
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginParent />}></Route>
            <Route
              path="/view-star-wars-universe"
              element={<MainNavigation />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
