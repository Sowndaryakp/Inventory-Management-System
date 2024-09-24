import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Applayout } from './components/layouts/AppLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import UserRegister from './pages/UserRegister'; // Import UserRegister component
// ... other imports

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/userregister" element={<UserRegister onUserRegistered={() => setIsAuthenticated(true)} />} /> {/* Add this route */}
        {isAuthenticated ? (
          <Route path="/" element={<Applayout />}>
            <Route index element={<Home />} />
            {/* ... other routes */}
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
};

export default App;