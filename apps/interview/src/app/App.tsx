import { Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import { CodingTask } from './CodingTask';
import { LayoutTask, CardTask, ApiDocs } from './pages';

const AppWrapper = styled.div`
  color: rgb(61, 61, 61);
  display: flex;
  height: 100vh;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 36px;
  border-right: 1px solid rgb(239, 239, 239);
  background: #fff;

  > a {
    position: relative;
    display: block;
    cursor: pointer;
    line-height: 26px;
    user-select: none;
    white-space: nowrap;
    text-decoration: none;
    height: 26px;
    color: rgb(131, 138, 145);
    margin-bottom: 8px;

    &:hover {
      background: white;
      text-decoration: none;
      color: rgb(78, 86, 97);
    }
  }
`;

const Logo = styled.div`
  height: 77px;
  background-image: url('/assets/images/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
`;

const Content = styled.div`
  flex: 1;
`;

export const App = () => (
  <AppWrapper>
    <Nav>
      <Logo />
      <Link to="/card-task">Card Task</Link>
      <Link to="/layout-task">Layout Task</Link>
      <Link to="/coding-task">Coding Task</Link>
      <Link to="/api-docs">API Documentation</Link>
    </Nav>
    <Content>
      <Routes>
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/card-task" element={<CardTask />} />
        <Route path="/layout-task" element={<LayoutTask />} />
        <Route path="/coding-task" element={<CodingTask />} />
      </Routes>
    </Content>
  </AppWrapper>
);

export default App;
