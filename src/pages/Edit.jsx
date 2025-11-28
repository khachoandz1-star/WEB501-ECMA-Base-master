import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const API = "http://localhost:3000";

function Edit() {
  const { id } = useParams(); // id là chuỗi: "1", "2"...

 
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState("");

  // Dùng +id → tự ép về số, gọn sạch đẹp!
  useEffect(() => {
    axios.get(`${API}/tours/${+id}`)
      .then((res) => {
        const t = res.data; //đổ dữ liệu cũ vào form
        setName(t.name ?? "");
        setDestination(t.destination ?? "");
        setDuration(t.duration ?? "");
        setPrice(t.price ?? "");
        setDescription(t.description ?? "");
        setAvailable(t.available ?? "");
      })
      .catch(() => toast.error("Không tìm thấy tour!"));
  }, [+id]); // dependency cũng dùng +id → chuẩn!

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${API}/tours/${+id}`, {
      name,
      destination,
      duration,
      price: Number(price),
      description,
      available: Number(available),
    })
      .then(() => {
        toast.success("Sửa tour thành công!");
      })
      .catch(() => {
        toast.error("Sửa thất bại!");
      });
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
        Sửa Tour
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Tên tour" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500" />
        <input required placeholder="Điểm đến" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full border p-3 rounded" />
        <input placeholder="Thời gian" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full border p-3 rounded" />
        <input required type="number" placeholder="Giá tiền" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-3 rounded" />
        <input placeholder="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-3 rounded" />
        <input required type="number" placeholder="Số chỗ" value={available} onChange={(e) => setAvailable(e.target.value)} className="w-full border p-3 rounded" />

        <div className="flex gap-3 pt-6">
          <button type="submit" className="flex-1 bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 transition">
            Lưu Thay Đổi
          </button>
          <Link to="/list" className="flex-1 text-center bg-gray-600 text-white p-3 rounded font-bold hover:bg-gray-700 transition">
            Quay Lại
          </Link>
        </div>
      </form>

      <Toaster position="top-center" />
    </div>
  );
}
export default Edit;