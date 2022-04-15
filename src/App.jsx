import { Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import List from './pages/List';

const App = () => (
  <Routes>
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="list" element={<List />} />
    </Route>
  </Routes>
);

export default App;
