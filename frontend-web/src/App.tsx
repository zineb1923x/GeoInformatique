import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/Map';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AppLayout from './components/AppLayout';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}> 
        <Route index element={<Home />} />
        <Route path="map" element={<MapPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
