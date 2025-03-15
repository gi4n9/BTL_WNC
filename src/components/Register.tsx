// src/components/Register.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role: 'user', phone }),
      });
      const data = await response.json();
      if (data.message === 'User registered successfully') {
        const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const loginData = await loginResponse.json();
        if (loginData.token) {
          login(loginData.token, loginData.role, loginData.username, loginData.email, loginData.phone);
          navigate('/');
        }
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tên người dùng"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Số điện thoại"
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Đăng ký
        </button>
      </form>
      <p className="mt-4 text-center">
        Đã có tài khoản?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
};

export default Register;