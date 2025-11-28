import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const API = "http://localhost:3000";

{/* Hiển thị*/}
function List() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/tours`)
      .then((response) => {
        setTours(response.data);
        toast.success("Thành công");
      })
      .catch(() => {
        toast.error("Không thành công");
      });
  }, []);

{/* Xóa*/}
  const Delete = (id) =>{
    if(confirm("Bạn có muốn xóa tour này không ?")){
      axios.delete(`${API}/tours/${id}`)
      .then(()=>{
        setTours(tours.filter(tour => tour.id == !id));
        toast.success("Xóa thành công");
      })
      .catch(()=>{
        toast.error("Xóa không thành công");
      });
    };
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">#</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Tên Tour</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Điểm đến</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Thời gian</th>
              <th className="px-4 py-2 border border-gray-300 text-right">Giá</th>
              <th className="px-4 py-2 border border-gray-300 text-center">Còn lại</th>
               <th className="px-4 py-2 border border-gray-300 text-center">Hành động</th>
            
            </tr>
          </thead>

          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour.id} className="hover:bg-gray-50"> {/* Không có key sẽ lỗi*/}
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border border-gray-300 font-medium">
                  {tour.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">{tour.destination}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.duration}</td>
                <td className="px-4 py-2 border border-gray-300 text-right text-green-600">
                  {tour.price}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  {tour.available} chỗ
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                <button onClick={() =>Delete(tour.id)}>Xóa</button>  {/*Nút xóa thêm hàm onclick */}
                <Link to={`/edit/${tour.id}`}>Sửa</Link>
                </td>

              </tr>
            ))}
          </tbody> {/*Lỗi dấu tbody → đã sửa đúng rồi nha bạn!*/}

        </table>
      </div>

      <Toaster position="top-center" /> {/* Thên thông báo */}
    </div>
  );
}

export default List;