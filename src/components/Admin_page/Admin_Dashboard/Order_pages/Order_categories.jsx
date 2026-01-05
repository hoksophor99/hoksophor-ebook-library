import { useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const Order_categories = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
const orders = [
  { id: 109, user: "Mark Lee", ebook: "Business Startup 101", amount: "$15.00", status: "Paid", date: "2026-04-12" },
  { id: 108, user: "Sarah Brown", ebook: "React for Beginners", amount: "$20.00", status: "Paid", date: "2026-04-02" },
  { id: 107, user: "Jane Smith", ebook: "Learn JavaScript", amount: "Free", status: "Free", date: "2026-03-22" },
  { id: 106, user: "John Doe", ebook: "Advanced CSS Techniques", amount: "$18.00", status: "Paid", date: "2026-03-10" },
  { id: 105, user: "Chris Wilson", ebook: "Digital Marketing Strategies", amount: "$30.00", status: "Paid", date: "2026-04-18" },
  { id: 104, user: "Emily Johnson", ebook: "Mastering Python", amount: "$25.00", status: "Paid", date: "2026-03-05" },
];
const filteredOrders = orders.filter((order) => {
  if (!startDate || !endDate) return true;

  const orderDate = new Date(order.date);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return orderDate >= start && orderDate <= end;
});



  return (
  <div className="min-h-screen p-4 sm:p-8">
    <div className="mx-auto max-w-8xl">
    {/* Header */}
      <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between"
      >
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-2xl text-slate-600">Filter by date:</span>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded-lg border px-3 py-2 text-base"
        />

        <span className="text-slate-500">to</span>

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="rounded-lg border px-3 py-2 text-base"
        />
      </div>



      <button className="flex items-center gap-2 self-start sm:self-auto rounded-lg bg-[#678EE7] px-4 py-2 text-lg text-white hover:bg-blue-500 transition">
      <Download size={16} /> Export
      </button>
      </motion.div>


      {/* Table */}
      <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
      {/* Header Row */}
      <div className="hidden md:grid grid-cols-5 bg-slate-100 px-6 py-3 text-lg font-medium text-slate-600">
      <span>Order ID</span>
      <span>User</span>
      <span>eBook</span>
      <span>Amount</span>
      <span>Status</span>
      </div>


      {filteredOrders.map((order, index) => (

      <motion.div
      key={order.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-0 items-center px-4 md:px-6 py-4 border-t"
      >
      {/* Order ID */}
      <p className="text-lg font-medium text-slate-700">#{order.id}</p>


      {/* User */}
      <p className="text-lg text-slate-700">{order.user}</p>


      {/* eBook */}
      <p className="text-lg text-slate-600">{order.ebook}</p>


      {/* Amount */}
      <p className="text-lg text-slate-700">{order.amount}</p>


      {/* Status */}
      <span
      className={`w-fit rounded-lg px-3 py-1 text-lg font-medium ${
      order.status === "Paid"
      ? "bg-green-100 text-green-700"
      : "bg-blue-100 text-[#678EE7]"
      }`}
      >
      {order.status}
      </span>
      </motion.div>
      ))}
      </div>
    </div>
  </div>
  )
}

export default Order_categories
