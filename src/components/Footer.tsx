import { PhoneIcon, MapPinIcon, MailIcon, ClockIcon, FacebookIcon, InstagramIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-800 text-white" id="contact">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">StyleCut</h3>
            <p className="text-gray-300 mb-4">
              Salon cắt tóc chuyên nghiệp với các dịch vụ cắt tóc, uốn, nhuộm và
              chăm sóc tóc chất lượng cao.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FacebookIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <InstagramIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-400" />
                <span>123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-blue-400" />
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center">
                <MailIcon className="h-5 w-5 mr-2 text-blue-400" />
                <span>info@stylecut.vn</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Giờ làm việc</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-blue-400" />
                <div>
                  <p>Thứ 2 - Thứ 6: 8:00 - 20:00</p>
                  <p>Thứ 7 - Chủ nhật: 8:00 - 18:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} StyleCut. Tất cả các quyền được
            bảo lưu.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;