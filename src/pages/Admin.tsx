import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminDashboard from '../components/AdminDashboard';
import AdminAppointments from '../components/AdminAppointments';
const Admin = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('dashboard');
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <AdminAppointments />;
      case 'customers':
        return <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Quản lý khách hàng</h2>
            <p className="text-gray-600">
              Tính năng này đang được phát triển...
            </p>
          </div>;
      case 'services':
        return <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Quản lý dịch vụ</h2>
            <p className="text-gray-600">
              Tính năng này đang được phát triển...
            </p>
          </div>;
      case 'settings':
        return <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Cài đặt hệ thống</h2>
            <p className="text-gray-600">
              Tính năng này đang được phát triển...
            </p>
          </div>;
      case 'dashboard': 
        return <AdminDashboard />;
    }
  };
  return <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar active={activeTab} />
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>;
};
export default Admin;