import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import NotFound from './pages/NotFound';
import Banner from './components/Banner';

const App: React.FC = () => {
  const routes = useRoutes([
    { path: '/', element: <ShowCreators /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
    { path: '/add', element: <AddCreator /> },
    { path: '*', element: <NotFound /> },
  ]);

  return (
    <div>
      <Banner /> {/* Include the Banner at the top */}
      {routes} {/* Render the routes */}
    </div>
  );
};

export default App;
