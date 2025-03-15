// src/components/Header.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuIcon, UserIcon, CalendarIcon, LogOutIcon, ChevronDownIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, role, username, email, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">StyleCut</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium">
                Trang chủ
              </Link>
              <Link to="/#services" className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium">
                Dịch vụ
              </Link>
              <Link to="/#stylists" className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium">
                Thợ cắt tóc
              </Link>
              <Link to="/#contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 font-medium">
                Liên hệ
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/#booking"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Đặt lịch
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <UserIcon className="h-6 w-6" />
                  <span className="ml-2">{username}</span>
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{username}</p>
                      <p className="text-sm text-gray-600">{email}</p>
                      <p className="text-sm text-gray-600">Vai trò: {role}</p>
                    </div>
                    {role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Quản lý
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOutIcon className="inline h-4 w-4 mr-2" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/#services"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Dịch vụ
            </Link>
            <Link
              to="/#stylists"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Thợ cắt tóc
            </Link>
            <Link
              to="/#contact"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Liên hệ
            </Link>
            {!isAuthenticated ? (
              <>
                <Link
                  to="/#booking"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đặt lịch
                </Link>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              </>
            ) : (
              <>
                <div className="px-3 py-2 border-b">
                  <p className="text-base font-medium text-gray-900">{username}</p>
                  <p className="text-sm text-gray-600">{email}</p>
                  <p className="text-sm text-gray-600">Vai trò: {role}</p>
                </div>
                {role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Quản lý
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout(); // Gọi logout
                    setIsMenuOpen(false); // Đóng menu
                  }} // Hợp nhất hai hành động
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 w-full text-left"
                >
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;