import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { CalendarIcon, UsersIcon, ScissorsIcon, BarChart2Icon, SettingsIcon, LogOutIcon, HomeIcon } from 'lucide-react';

interface AdminSidebarProps {
  active: string;
  onLogout: () => void; // Thêm prop onLogout
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ active, onLogout }) => {
  const navigate = useNavigate(); // Thêm useNavigate để điều hướng

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <BarChart2Icon className="h-5 w-5" />,
      path: '/admin?tab=dashboard',
    },
    {
      name: 'Lịch hẹn',
      icon: <CalendarIcon className="h-5 w-5" />,
      path: '/admin?tab=appointments',
    },
    {
      name: 'Khách hàng',
      icon: <UsersIcon className="h-5 w-5" />,
      path: '/admin?tab=customers',
    },
    {
      name: 'Dịch vụ',
      icon: <ScissorsIcon className="h-5 w-5" />,
      path: '/admin?tab=services',
    },
    {
      name: 'Cài đặt',
      icon: <SettingsIcon className="h-5 w-5" />,
      path: '/admin?tab=settings',
    },
  ];

  const handleLogout = () => {
    // Xóa thông tin đăng nhập khỏi localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    
    // Gọi hàm onLogout từ props
    onLogout();
    
    // Điều hướng về trang Home
    navigate('/');
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 flex items-center justify-center border-b border-gray-700">
        <span className="text-xl font-bold">StyleCut Admin</span>
      </div>
      <div className="flex-grow">
        <nav className="mt-5">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 hover:bg-gray-700 ${
                    active === item.name.toLowerCase() ? 'bg-gray-700' : ''
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout} // Thêm sự kiện onClick cho nút Đăng xuất
          className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-md w-full mt-2"
        >
          <LogOutIcon className="h-5 w-5" />
          <span className="ml-3">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;