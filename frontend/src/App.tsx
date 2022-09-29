import React, { useEffect, useState } from 'react';
import './App.css';
// route
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
// external library
import { getCookie } from './api/config/cookie';
// custom component
import Navbar from './components/common/navbar/Navbar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import SearchPage from './pages/SearchPage';
import DashboardPage from './pages/DashboardPage';

import CuisineContainer from '../src/components/detail/cuisine/CuisineContainer';
import IngredientContainer from '../src/components/detail/ingredient/IngredientContainer';

import ReviewContainer from '../src/components/detail/reviews/ReviewContainer';

import MyRefrigerator from './pages/MyRefrigerator';
// 테스트용
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    // isLoggedIn
    //   ? localStorage.setItem('isLoggedIn', 'true')
    //   : localStorage.removeItem('isLoggedIn');
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoading(true);
    const accessToken = getCookie('accessToken');
    accessToken ? setIsLoggedIn(() => true) : setIsLoggedIn(() => false);
    setIsLoading(false);
  }, []);
  return (
    <div className="App">
      {!isLoading && (
        <BrowserRouter>
          {isLoggedIn && <Navbar />}
          <Routes>
            {!isLoggedIn && (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                {/* test용 컴포넌트 */}
              </>
            )}
            {isLoggedIn && (
              <>
                <Route path="/detail/:recipeId" element={<RecipeDetailPage />}>
                  <Route index element={<CuisineContainer />} />
                  {/* <Route path="ingredient" element={<NutrituiContainer />} /> */}
                  <Route path="review" element={<ReviewContainer />} />
                </Route>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/myrefrigerator" element={<MyRefrigerator />} />
              </>
            )}
            {/* 현재 로직으로는 404 페이지 대신에 로그인 또는 메인으로 리다이렉트됨 */}
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? '/main' : '/login'} />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
