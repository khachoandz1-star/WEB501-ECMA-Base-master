import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // thêm useNavigate

const API = "http://localhost:3000";

function Signin() {
  const navigate = useNavigate(); // khởi tạo navigate

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = (e) => {
    e.preventDefault();
    axios
      .post(`${API}/login`, { email, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.accessToken); // lưu token nếu cần
        toast.success("Đăng nhập thành công!");

        // ✅ Điều hướng sang trang /list
        navigate("/list");
      })
      .catch(() => toast.error("Sai email hoặc mật khẩu!"));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-8">ĐĂNG NHẬP</h1>

        <form onSubmit={handle} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-center mt-6">
          Chưa có tài khoản? <a href="/signup" className="text-blue-600 font-bold">Đăng ký ngay</a>
        </p>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default Signin;
