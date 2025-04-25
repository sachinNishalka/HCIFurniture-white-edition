import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import {
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { cart, favorites, user, logout, isAdmin } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  // Close the user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Living Room", href: "/category/living-room" },
    { name: "Dining Room", href: "/category/dining-room" },
    { name: "Bedroom", href: "/category/bedroom" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-bold text-red-600">LUX</span>
                  <span className="text-2xl font-bold text-black">
                    Furniture
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop links */}
            <div className="hidden lg:flex lg:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-bold uppercase ${
                    location.pathname === item.href
                      ? "text-accent-600"
                      : "text-black hover:text-accent-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop icons */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              {/* Favorites */}
              <Link
                to="/favorites"
                className="relative text-gray-700 hover:text-gray-900"
              >
                <HeartIcon className="h-6 w-6" />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {favorites.length}
                  </span>
                )}
              </Link>

              {/* User / Login */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="text-gray-700 hover:text-gray-900 focus:outline-none"
                  >
                    <UserIcon className="h-6 w-6" />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        {user.name}
                      </div>
                      <Link
                        to={isAdmin ? "/admin" : "/dashboard"}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                  <UserIcon className="h-6 w-6" />
                </Link>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-gray-900"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile slide-out */}
          {isMenuOpen && (
            <div className="lg:hidden mt-2 space-y-1 border-t border-primary-300 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-bold uppercase text-black hover:text-accent-600"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                to="/favorites"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-bold uppercase text-black hover:text-accent-600"
              >
                Favorites ({favorites.length})
              </Link>

              {!user && (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-base font-bold uppercase text-black hover:text-accent-600"
                >
                  <UserIcon className="h-6 w-6 mr-2" /> Login
                </Link>
              )}

              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-bold uppercase text-black hover:text-accent-600"
              >
                Cart ({cart.length})
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-primary-300">
                FurnitureLab brings you the finest furniture with immersive 3D
                visualization.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/category/living-room"
                    className="text-primary-300 hover:text-white"
                  >
                    Living Room
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/dining-room"
                    className="text-primary-300 hover:text-white"
                  >
                    Dining Room
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/bedroom"
                    className="text-primary-300 hover:text-white"
                  >
                    Bedroom
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/contact"
                    className="text-primary-300 hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    className="text-primary-300 hover:text-white"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    className="text-primary-300 hover:text-white"
                  >
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-primary-300 hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-300 hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary-300 hover:text-white">
                    Pinterest
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-700 text-center text-primary-300">
            <p>&copy; 2025 FurnitureLab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
