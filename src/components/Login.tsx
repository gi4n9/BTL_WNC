// src/components/Login.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        login(data.token, data.role, data.username, data.email, data.phone); // Lưu phone
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Đăng nhập
        </button>
      </form>
      <p className="mt-4 text-center">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
};

export default Login;