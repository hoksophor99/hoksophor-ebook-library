import { motion } from "framer-motion";
import { ArrowLeft, UserX } from "lucide-react";

const User_view = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    joined: "Jan 10, 2024",
    totalSpent: "$25.00",
    totalDownloads: 3,
    purchases: [
      { title: "Learn JavaScript", price: "Free" },
      { title: "Mastering Python", price: "$25.00" },
    ],
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center justify-between"
        >
          <h1 className="text-xl sm:text-3xl font-semibold text-slate-800">
            User Details
          </h1>
          <div className="flex gap-3 ">
            <button className="flex items-center gap-2 rounded-lg bg-[#678EE7] px-4 py-2 text-base text-white hover:bg-blue-600 transition">
              <UserX size={16} /> Disable User
            </button>
            <a 
            href="/users_pages"
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-base text-slate-600 hover:bg-slate-100 transition"
            >
                <ArrowLeft size={16} /> Back
            </a>
          </div>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl bg-white p-6 shadow"
        >
          <div className="md:col-span-2 space-y-4">
            <InfoRow label="Name" value={user.name} />
            <InfoRow
              label="Email"
              value={
                <a href={`mailto:${user.email}`} className="text-blue-600">
                  {user.email}
                </a>
              }
            />
            <InfoRow
              label="Status"
              value={
                <span className="rounded-md bg-green-100 px-3 py-1 text-sm text-green-700">
                  {user.status}
                </span>
              }
            />
            <InfoRow label="Joined" value={user.joined} />
          </div>

          <div className="space-y-3 text-sm">
            <StatCard label="Total Spent" value={user.totalSpent} />
            <StatCard label="Total Downloads" value={user.totalDownloads} />
          </div>
        </motion.div>

        {/* Purchased eBooks */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 rounded-2xl bg-white shadow overflow-hidden"
        >
          <div className="bg-slate-100 px-6 py-3 text-lg font-medium text-slate-600">
            Purchased eBooks
          </div>
          <div className="divide-y">
            {user.purchases.map((book) => (
              <div
                key={book.title}
                className="flex items-center justify-between px-6 py-4 text-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-800">{book.title}</span>
                  {book.price === "Free" && (
                    <span className="rounded bg-green-100 px-2 py-0.5 text-lg text-green-700">
                      Free
                    </span>
                  )}
                </div>
                <span className="text-slate-700">{book.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

function InfoRow({ label, value }) {
  return (
    <div className="flex gap-6 text-lg">
      <span className="w-24 text-slate-500">{label}:</span>
      <span className="text-slate-800">{value}</span>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 text-center">
      <p className="text-base text-slate-500">{label}</p>
      <p className="text-lg font-semibold text-slate-800">{value}</p>
    </div>
  );
}

export default User_view;
