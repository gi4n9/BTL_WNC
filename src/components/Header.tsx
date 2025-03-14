import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, UserIcon, CalendarIcon } from 'lucide-react';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="bg-white shadow-sm">
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
            <Link to="/#booking" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Đặt lịch
            </Link>
            <Link to="/admin" className="ml-4 text-gray-700 hover:text-gray-900">
              <UserIcon className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Trang chủ
            </Link>
            <Link to="/#services" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Dịch vụ
            </Link>
            <Link to="/#stylists" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Thợ cắt tóc
            </Link>
            <Link to="/#contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Liên hệ
            </Link>
            <Link to="/#booking" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Đặt lịch
            </Link>
            <Link to="/admin" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Quản lý
            </Link>
          </div>
        </div>}
    </header>;
};
export default Header;