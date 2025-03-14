import { CalendarIcon, UsersIcon, CreditCardIcon, TrendingUpIcon, ClockIcon } from 'lucide-react';
const AdminDashboard = () => {
  // Mock data for dashboard
  const stats = [{
    name: 'Lịch hẹn hôm nay',
    value: '12',
    icon: <CalendarIcon className="h-6 w-6 text-blue-500" />,
    change: '+20%'
  }, {
    name: 'Khách hàng mới',
    value: '24',
    icon: <UsersIcon className="h-6 w-6 text-green-500" />,
    change: '+15%',
    period: 'tháng này'
  }, {
    name: 'Doanh thu',
    value: '8.5M',
    icon: <CreditCardIcon className="h-6 w-6 text-purple-500" />,
    change: '+12%',
    period: 'tháng này'
  }, {
    name: 'Tỉ lệ đặt lịch',
    value: '85%',
    icon: <TrendingUpIcon className="h-6 w-6 text-yellow-500" />,
    change: '+5%',
    period: 'so với tháng trước'
  }];
  const upcomingAppointments = [{
    time: '10:00',
    customer: 'Nguyễn Văn A',
    service: 'Cắt tóc nam',
    stylist: 'Trần Thị B'
  }, {
    time: '10:30',
    customer: 'Lê Thị C',
    service: 'Uốn tóc',
    stylist: 'Nguyễn Văn A'
  }, {
    time: '11:00',
    customer: 'Phạm Văn D',
    service: 'Nhuộm tóc',
    stylist: 'Lê Văn C'
  }, {
    time: '13:30',
    customer: 'Trần Văn E',
    service: 'Cắt tóc nam',
    stylist: 'Phạm Thị D'
  }];
  return <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                {stat.period && <p className="mt-1 text-sm text-gray-500">{stat.period}</p>}
              </div>
              <div>{stat.icon}</div>
            </div>
            {stat.change && <div className="mt-2 flex items-center text-sm">
                <span className="text-green-600">{stat.change}</span>
              </div>}
          </div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Lịch hẹn hôm nay</h3>
            <ClockIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giờ
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dịch vụ
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thợ cắt tóc
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingAppointments.map((appointment, index) => <tr key={index}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {appointment.time}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {appointment.customer}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {appointment.service}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {appointment.stylist}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Xem tất cả lịch hẹn
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Thống kê dịch vụ</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Cắt tóc nam
                </span>
                <span className="text-sm font-medium text-gray-700">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{
                width: '45%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Cắt tóc nữ
                </span>
                <span className="text-sm font-medium text-gray-700">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{
                width: '25%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Uốn tóc
                </span>
                <span className="text-sm font-medium text-gray-700">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{
                width: '15%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Nhuộm tóc
                </span>
                <span className="text-sm font-medium text-gray-700">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{
                width: '10%'
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Gội đầu
                </span>
                <span className="text-sm font-medium text-gray-700">5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{
                width: '5%'
              }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default AdminDashboard;