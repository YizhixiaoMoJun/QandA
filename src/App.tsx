/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';
import { QuestionPage } from './QuestionPage';
import { SearchPage } from './SearchPage';
import { SigninPage } from './SignInPage';
import { fontFamily, fontSize, gray2 } from './styles';

const AskPage = React.lazy(() =>
  import('./AskPage'));

function App() {
  return (
    <BrowserRouter>
      <div css={css`
                  font-family : ${fontFamily};
                  font-size: ${fontSize};
                  color: ${gray2};
                  `}
      >
        <Header />
        <Routes>
          <Route path="" element={<HomePage />}></Route>
          <Route path="search" element={<SearchPage />}></Route>
          <Route path="ask" element={
            <React.Suspense
              fallback={
                <div
                  css={css`
                  margin-top:100px;
                  text-align:center;`}>Loading...</div>
              }>
              <AskPage />
            </React.Suspense>}>
          </Route>
          <Route path="signin" element={<SigninPage />}></Route>
          <Route path="questions/:questionId" element={<QuestionPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
