// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';
import ServiceCard from '../components/ServiceCard';
import StylistCard from '../components/StylistCard';
import { CalendarIcon, CheckIcon, ClockIcon, ScissorsIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Service {
  id: number;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
}

interface Stylist {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
  experience: string;
}

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, role, username, email, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await fetch('http://localhost:5000/api/data/services');
        const servicesData = await servicesResponse.json();
        setServices(servicesData);

        const stylistsResponse = await fetch('http://localhost:5000/api/data/stylists');
        const stylistsData = await stylistsResponse.json();
        setStylists(stylistsData);

        if (role === 'admin') {
          navigate('/admin');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, role]);

  if (loading) {
    return <div className="min-h-screen flex flex-col bg-gray-50">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {isAuthenticated ? (
        <>
          <h2 className="text-center mt-4">
            Chào mừng {username} ({role === 'admin' ? 'Quản lý' : role === 'stylist' ? 'Thợ cắt tóc' : 'Người dùng'})
          </h2>
          <section className="relative bg-blue-700 text-white">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Hair salon background"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
              <div className="md:w-3/5">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Chào mừng đến với StyleCut
                </h1>
                <p className="text-xl mb-8">
                  Salon tóc chuyên nghiệp với các dịch vụ cắt tóc, uốn, nhuộm và chăm sóc tóc chất lượng cao.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#booking"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100"
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    Đặt lịch ngay
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800"
                  >
                    <ScissorsIcon className="mr-2 h-5 w-5" />
                    Dịch vụ của chúng tôi
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                    <CheckIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Chất lượng hàng đầu</h3>
                  <p className="text-gray-600">
                    Chúng tôi cam kết mang đến dịch vụ chăm sóc tóc chất lượng cao với đội ngũ thợ cắt tóc chuyên nghiệp.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                    <ClockIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Tiết kiệm thời gian</h3>
                  <p className="text-gray-600">
                    Đặt lịch trực tuyến dễ dàng, không cần chờ đợi và được phục vụ đúng giờ.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                    <ScissorsIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Đa dạng dịch vụ</h3>
                  <p className="text-gray-600">
                    Chúng tôi cung cấp nhiều dịch vụ từ cắt tóc cơ bản đến uốn, nhuộm và chăm sóc tóc chuyên sâu.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="py-16 bg-gray-50" id="services">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Dịch vụ của chúng tôi</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Chúng tôi cung cấp nhiều dịch vụ chăm sóc tóc chuyên nghiệp để đáp ứng nhu cầu của bạn.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    price={service.price}
                    description={service.description}
                    imageUrl={service.imageUrl}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="py-16 bg-blue-700 text-white" id="booking">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Đặt lịch cắt tóc ngay hôm nay</h2>
                  <p className="text-xl mb-8">
                    Đặt lịch trước để được phục vụ tốt nhất và không cần chờ đợi. Chúng tôi sẽ liên hệ xác nhận lịch hẹn của bạn.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <CheckIcon className="h-6 w-6 mr-3" />
                      <span>Đặt lịch trực tuyến dễ dàng, nhanh chóng</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-6 w-6 mr-3" />
                      <span>Xác nhận lịch hẹn qua điện thoại</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-6 w-6 mr-3" />
                      <span>Nhắc nhở lịch hẹn trước 24 giờ</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-6 w-6 mr-3" />
                      <span>Thay đổi hoặc hủy lịch hẹn dễ dàng</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <BookingForm />
                </div>
              </div>
            </div>
          </section>
          <section className="py-16 bg-white" id="stylists">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Đội ngũ thợ cắt tóc</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Gặp gỡ đội ngũ thợ cắt tóc chuyên nghiệp và giàu kinh nghiệm của chúng tôi.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stylists.map((stylist) => (
                  <StylistCard
                    key={stylist.id}
                    name={stylist.name}
                    position={stylist.position}
                    imageUrl={stylist.imageUrl}
                    experience={stylist.experience}
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Khách hàng nói gì về chúng tôi</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Đây là những đánh giá từ khách hàng đã trải nghiệm dịch vụ của chúng tôi.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">Trần Văn H</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "Tôi rất hài lòng với kiểu tóc mới. Thợ cắt tóc rất chuyên nghiệp và tư vấn tận tình. Chắc chắn tôi sẽ quay lại!"
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">Nguyễn Thị M</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "Dịch vụ uốn tóc tại đây thật tuyệt vời! Tôi đã nhận được nhiều lời khen về kiểu tóc mới. Cảm ơn StyleCut rất nhiều."
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">Lê Văn T</h4>
                      <div className="flex text-yellow-400">
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "Đội ngũ nhân viên rất thân thiện và chuyên nghiệp. Tôi đặc biệt hài lòng với dịch vụ nhuộm tóc. Màu tóc đẹp và bền màu."
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="text-center mt-10">
          <Link to="/login" className="bg-blue-500 text-white p-2 rounded mr-2">
            Đăng nhập
          </Link>
          <Link to="/register" className="bg-green-500 text-white p-2 rounded">
            Đăng ký
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;