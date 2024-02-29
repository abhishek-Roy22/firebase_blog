import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Navbar from './components/Navbar';
import Create from './pages/Create';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <div className="max-w-7xl mx-auto font-mono">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/blog/:id"
          element={
            <PrivateRoute>
              <BlogDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
