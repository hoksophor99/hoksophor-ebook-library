import React from 'react'
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { BookOpen, Users, DollarSign, Download } from "lucide-react";

const stats = [
  {
    title: "Total eBooks",
    value: "135",
    meta: "Free: 60  |  Paid: 75",
    icon: BookOpen,
  },
  {
    title: "Total Users",
    value: "1,250",
    meta: "Users: 578  |  Parents: 70",
    icon: Users,
  },
  {
    title: "Total Sales",
    value: "$12,300",
    meta: "Last 7 days",
    icon: DollarSign,
  },
  {
    title: "Total Downloads",
    value: "4,527",
    meta: "Free: 3,200  |  Paid: 1,327",
    icon: Download,
  },
];

const salesData = [
  { day: "Mon", sales: 600 },
  { day: "Tue", sales: 950 },
  { day: "Wed", sales: 1450 },
  { day: "Thu", sales: 2000 },
  { day: "Fri", sales: 2600 },
  { day: "Sat", sales: 1950 },
  { day: "Sun", sales: 1400 },
];

const downloads = [
  { name: "Free", value: 3200 },
  { name: "Paid", value: 1327 },
];

const recentActivity = [
  { order: "104", user: "Chris Wilson", ebook: "Mastering Python", amount: "$25.00", status: "Paid" },
  { order: "103", user: "Sarah Brown", ebook: "Learn React", amount: "$15.00", status: "Paid" },
  { order: "102", user: "John Doe", ebook: "JavaScript Essentials", amount: "$10.00", status: "Paid" },
];

const recentDownloads = [
  { user: "Jane Smith", ebook: "Learn JavaScript", type: "Free", date: "04/28/2024" },
  { user: "Mark Lee", ebook: "Mastering Python", type: "Paid", date: "04/28/2024" },
  { user: "Emily Johnson", ebook: "Marketing 101", type: "Free", date: "04/27/2024" },
];

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ title, right }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <div className="text-sm font-semibold text-slate-700">{title}</div>
      {right}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
      {children}
    </span>
  );
}

function StatCard({ item, i }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.05 * i, type: "spring", stiffness: 380, damping: 30 }}
    >
      <Card className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-slate-600">{item.title}</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{item.value}</div>
            <div className="mt-2 text-xs text-slate-500">{item.meta}</div>
          </div>
          <div className="shrink-0 rounded-2xl bg-[#678EE7] p-3 text-white">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function Table({ columns, rows }) {
  return (
    <div className="px-5 pb-5 pt-3 overflow-x-auto">
      <table className="min-w-140 w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            {columns.map((c) => (
              <th key={c} className="pb-2 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-slate-100">
              {Object.values(r).map((val, j) => (
                <td key={j} className="py-3 pr-4">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


const Home_categories = () => {
  return (
    <div className="space-y-6 min-h-screen bg-slate-100">
      {/* Top stat cards */}
      <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.title} item={s} i={i} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 380, damping: 30 }}
        >
          <Card>
            <CardHeader
              title="Sales Overview"
              right={
                <div className="flex items-center gap-2">
                  <Pill>Last 7 Days</Pill>
                </div>
              }
            />
            <div className="px-5 pb-5 pt-3 h-64 ">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                fill="#678EE7" 
                 data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" radius={[10, 10, 10, 10]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.16, type: "spring", stiffness: 380, damping: 30 }}
        >
          <Card>
            <CardHeader
              title="Downloads Breakdown"
              right={<a href="#" className="text-sm text-blue-600 hover:underline">View All</a>}
            />
            <div className="px-5 pb-5 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={downloads}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      <Cell fill="var(--tw-prose-links, #2563eb)" />
                      <Cell fill="var(--tw-prose-body, #22c55e)" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div className="text-sm font-medium text-slate-700">Free</div>
                  <div className="text-sm text-slate-600">3,200</div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <div className="text-sm font-medium text-slate-700">Paid</div>
                  <div className="text-sm text-slate-600">1,327</div>
                </div>
                <div className="text-xs text-slate-500">
                  Free is ~71% • Paid is ~29%
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 380, damping: 30 }}
        >
          <Card>
            <CardHeader
              title="Recent Activity"
              right={<a href="#" className="text-sm text-blue-600 hover:underline">View All</a>}
            />
            <Table
              columns={["Order", "User", "EBook", "Amount", "Status"]}
              rows={recentActivity.map((r) => ({
                Order: r.order,
                User: r.user,
                EBook: r.ebook,
                Amount: r.amount,
                Status: (
                  <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                    {r.status}
                  </span>
                ),
              }))}
            />
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.24, type: "spring", stiffness: 380, damping: 30 }}
        >
          <Card>
            <CardHeader
              title="Recent Downloads"
              right={<a href="#" className="text-sm text-blue-600 hover:underline">View All</a>}
            />
            <Table
              columns={["User", "EBook", "Type", "Date"]}
              rows={recentDownloads.map((r) => ({
                User: r.user,
                EBook: r.ebook,
                Type: (
                  <span
                    className={[
                      "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
                      r.type === "Paid"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-100 text-slate-700",
                    ].join(" ")}
                  >
                    {r.type}
                  </span>
                ),
                Date: r.date,
              }))}
            />
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Home_categories
