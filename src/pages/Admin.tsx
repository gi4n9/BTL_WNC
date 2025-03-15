// src/pages/Admin.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminDashboard from '../components/AdminDashboard';
import AdminAppointments from '../components/AdminAppointments';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Admin = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { role, logout } = useAuth(); // Sử dụng useAuth

  useEffect(() => {
    // Kiểm tra vai trò
    if (role !== 'admin') {
      navigate('/');
      return;
    }

    // Xử lý tab
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams, navigate, role]);

  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <AdminAppointments />;
      case 'customers':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Quản lý khách hàng</h2>
            <p className="text-gray-600">Tính năng này đang được phát triển...</p>
          </div>
        );
      case 'services':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Quản lý dịch vụ</h2>
            <p className="text-gray-600">Tính năng này đang được phát triển...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Cài đặt hệ thống</h2>
            <p className="text-gray-600">Tính năng này đang được phát triển...</p>
          </div>
        );
      case 'dashboard':
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar active={activeTab} onLogout={logout} />
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default Admin;
