import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, UserIcon, PhoneIcon, MailIcon, ScissorsIcon } from 'lucide-react';
const services = [{
  id: 1,
  name: 'Cắt tóc nam',
  price: '100.000đ',
  duration: '30 phút'
}, {
  id: 2,
  name: 'Cắt tóc nữ',
  price: '150.000đ',
  duration: '45 phút'
}, {
  id: 3,
  name: 'Uốn tóc',
  price: '350.000đ',
  duration: '120 phút'
}, {
  id: 4,
  name: 'Nhuộm tóc',
  price: '400.000đ',
  duration: '90 phút'
}, {
  id: 5,
  name: 'Gội đầu',
  price: '80.000đ',
  duration: '20 phút'
}];
const stylists = [{
  id: 1,
  name: 'Nguyễn Văn A'
}, {
  id: 2,
  name: 'Trần Thị B'
}, {
  id: 3,
  name: 'Lê Văn C'
}, {
  id: 4,
  name: 'Phạm Thị D'
}];
const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'];
const BookingForm = () => {
  const [formData, setFormData] = useState({
    service: '',
    stylist: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    setSubmitted(true);
    // In a real app, this would send the data to the backend
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        service: '',
        stylist: '',
        date: '',
        time: '',
        name: '',
        phone: '',
        email: ''
      });
    }, 3000);
  };
  return <div className="bg-white p-6 rounded-lg shadow-lg text-black" id="booking-form">
      <h2 className="text-2xl font-bold mb-6 text-center">Đặt lịch cắt tóc</h2>
      {submitted ? <div className="bg-green-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Đặt lịch thành công!
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Cảm ơn bạn đã đặt lịch. Chúng tôi sẽ liên hệ với bạn để xác
                  nhận lịch hẹn.
                </p>
              </div>
            </div>
          </div>
        </div> : <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <ScissorsIcon className="h-4 w-4 mr-1" />
                Dịch vụ
              </div>
            </label>
            <select name="service" value={formData.service} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="">Chọn dịch vụ</option>
              {services.map(service => <option key={service.id} value={service.id}>
                  {service.name} - {service.price} ({service.duration})
                </option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                Thợ cắt tóc
              </div>
            </label>
            <select name="stylist" value={formData.stylist} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option value="">Chọn thợ cắt tóc</option>
              {stylists.map(stylist => <option key={stylist.id} value={stylist.id}>
                  {stylist.name}
                </option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  Ngày
                </div>
              </label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  Giờ
                </div>
              </label>
              <select name="time" value={formData.time} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Chọn giờ</option>
                {timeSlots.map(time => <option key={time} value={time}>
                    {time}
                  </option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                Họ và tên
              </div>
            </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <PhoneIcon className="h-4 w-4 mr-1" />
                Số điện thoại
              </div>
            </label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <MailIcon className="h-4 w-4 mr-1" />
                Email
              </div>
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Đặt lịch
            </button>
          </div>
        </form>}
    </div>;
};
export default BookingForm;