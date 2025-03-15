import { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon } from 'lucide-react';

const AdminAppointments = () => {
  interface Appointment {
    id: number;
    username: string;
    phone: string;
    service: string;
    stylist: string;
    date: string;
    time: string;
    status: string;
  }
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/appointments');
        if (!response.ok) throw new Error('Không thể lấy dữ liệu');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Lỗi khi lấy dữ liệu lịch hẹn:', error.message);
        } else {
          console.error('Lỗi không xác định:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const payload = { status: newStatus };
      console.log('Sending status update:', payload);

      const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Không thể cập nhật trạng thái');
      }

      setAppointments(
        appointments.map(appointment =>
          appointment.id === id ? { ...appointment, status: newStatus } : appointment
        )
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error('Lỗi khi cập nhật trạng thái:', error.message);
        alert(`Lỗi: ${error.message}`);
      } else {
        console.error('Lỗi không xác định:', error);
        alert('Lỗi không xác định');
      }
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment({ ...appointment });
  };

  const handleSaveEdit = async () => {
    if (editingAppointment) {
      try {
        console.log('Sending edit data:', editingAppointment);
        const response = await fetch(`http://localhost:5000/api/appointments/${editingAppointment.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingAppointment),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Không thể cập nhật lịch hẹn');
        }

        setAppointments(
          appointments.map(appointment =>
            appointment.id === editingAppointment.id ? editingAppointment : appointment
          )
        );
        setEditingAppointment(null);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Lỗi khi lưu chỉnh sửa:', error.message);
          alert(`Lỗi: ${error.message}`);
        } else {
          console.error('Lỗi không xác định:', error);
          alert('Lỗi không xác định');
        }
      }
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const username = appointment.username || '';
    const phone = appointment.phone || '';
    const matchesSearch =
      username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-6">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Quản lý lịch hẹn</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm theo tên hoặc SĐT"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FilterIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dịch vụ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thợ cắt tóc</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày & Giờ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{appointment.username || 'Không có tên'}</div>
                  <div className="text-sm text-gray-500">{appointment.phone || 'Không có SĐT'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.service || 'Không xác định'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.stylist || 'Không xác định'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {appointment.date ? new Date(appointment.date).toLocaleDateString('vi-VN') : 'Không có ngày'}
                  </div>
                  <div className="text-sm text-gray-500">{appointment.time || 'Không có giờ'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                    {appointment.status === 'confirmed' && 'Đã xác nhận'}
                    {appointment.status === 'pending' && 'Chờ xác nhận'}
                    {appointment.status === 'cancelled' && 'Đã hủy'}
                    {!['confirmed', 'pending', 'cancelled'].includes(appointment.status) && 'Không xác định'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(appointment)} className="text-blue-600 hover:text-blue-900">
                      Sửa
                    </button>
                    {appointment.status === 'pending' && (
                      <button onClick={() => handleStatusChange(appointment.id, 'confirmed')} className="text-green-600 hover:text-green-900">
                        Xác nhận
                      </button>
                    )}
                    {appointment.status !== 'cancelled' && (
                      <button onClick={() => handleStatusChange(appointment.id, 'cancelled')} className="text-red-600 hover:text-red-900">
                        Hủy
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Chỉnh sửa lịch hẹn</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Khách hàng</label>
                <input
                  type="text"
                  value={editingAppointment.username || ''}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input
                  type="text"
                  value={editingAppointment.phone || ''}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dịch vụ</label>
                <select
                  value={editingAppointment.service || ''}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, service: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Chọn dịch vụ</option>
                  <option>Cắt tóc nam</option>
                  <option>Cắt tóc nữ</option>
                  <option>Uốn tóc</option>
                  <option>Nhuộm tóc</option>
                  <option>Gội đầu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thợ cắt tóc</label>
                <select
                  value={editingAppointment.stylist || ''}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, stylist: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Chọn thợ</option>
                  <option>Nguyễn Văn A</option>
                  <option>Trần Thị B</option>
                  <option>Lê Văn C</option>
                  <option>Phạm Thị D</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
                  <input
                    type="date"
                    value={editingAppointment.date || ''}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giờ</label>
                  <select
                    value={editingAppointment.time || ''}
                    onChange={(e) => setEditingAppointment({ ...editingAppointment, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Chọn giờ</option>
                    {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  value={editingAppointment.status || ''}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingAppointment(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;