import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Add() {
  const API = "http://localhost:3000";
  

  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API}/tours`, {
        name,
        destination,
        duration,
        price: Number(price),
        description,
        available: Number(available),
      })
      .then((res) => {   // ← SỬA DÒNG NÀY: thêm (res) vào
        toast.success("Thêm tour thành công!");
        setName("");
        setDestination("");
        setDuration("");
        setPrice("");
        setDescription("");
        setAvailable("");
       
      })
      .catch(() => {
        
        toast.error("Lỗi! Kiểm tra server hoặc dữ liệu");
      });
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Thêm Tour Mới</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Tên tour" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-3 rounded" />
        <input required placeholder="Điểm đến" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full border p-3 rounded" />
        <input placeholder="Thời gian" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full border p-3 rounded" />
        <input required type="number" placeholder="Giá tiền" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-3 rounded" />
        <input placeholder="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-3 rounded" />
        <input required type="number" placeholder="Số chỗ" value={available} onChange={(e) => setAvailable(e.target.value)} className="w-full border p-3 rounded" />

        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
            Thêm Ngay
          </button>
          <Link to="/list" className="flex-1 text-center bg-gray-600 text-white p-3 rounded font-bold hover:bg-gray-700">
            Quay Lại
          </Link>
        </div>
      </form>

      <Toaster position="top-center" />
    </div>
  );
}
export default Add;