import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/blog-logo.svg';
import { useAuth } from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    signOut(auth);
    logout();
  };

  return (
    <nav className="w-full py-4 px-2 flex items-center justify-between sticky top-0 bg-white z-10">
      <Link to="/" className="flex items-center sm:gap-1 sm:text-2xl">
        <span className="text-slate-900 font-semibold">Blogpost</span>
        <img src={Logo} alt="blog-logo" />
      </Link>
      <ul className="hidden sm:flex items-center gap-6 list-none">
        <li className="block text-slate-900 font-semibold cursor-pointer">
          Home
        </li>
        <li className="block text-slate-900 font-semibold cursor-pointer">
          Products
        </li>
        <li className="block text-slate-900 font-semibold cursor-pointer">
          Blogs
        </li>
        <li className="block text-slate-900 font-semibold cursor-pointer">
          About us
        </li>
      </ul>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <span className="block text-nowrap font-semibold text-slate-900 capitalize">
              {user?.split('@')[0]}
            </span>
            <NavLink
              to="/create"
              title="create blog"
              className="flex items-center justify-center w-10 h-10 py-1 px-3 border-2 border-indigo-500 text-slate-900 rounded-full font-semibold hover:bg-indigo-500 hover:text-slate-100"
            >
              ➕
            </NavLink>
            <button
              onClick={handleLogout}
              className="block py-1 px-3 border-2 border-indigo-500 rounded-md bg-transparent font-semibold bg-indigo-500 text-slate-900 tracking-wide"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            className="block py-1 px-3 border-2 border-indigo-400 hover:bg-indigo-500 hover:text-indigo-100 rounded-md bg-transparent font-semibold"
            to="/signup"
          >
            Sign up
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
