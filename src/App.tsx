import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginParent from './pages/LoginPage/LoginPage';
import MainNavigation from './pages/MainNavigationPage/MainNavigationPage';

import './App.scss';
import SearchPage from './pages/SearchPage/SearchPage';

function App() {
  return (
    <div className="app">
      <div className="app--wrap">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginParent />}></Route>
            <Route path="/view-star-wars-universe" element={<MainNavigation />}>
              <Route index element={<SearchPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
