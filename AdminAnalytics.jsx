import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  LineChart, Line,
  CartesianGrid, Tooltip, XAxis, YAxis, Legend
} from "recharts";

export default function AdminAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/analytics/dashboard").then((res) => setData(res.data));
  }, []);

  if (!data || !data.counts) return <p>Loading analytics...</p>;

  const COLORS = ["#800000", "#cc0000", "#990000", "#550000", "#ff4444"];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-ucu-maroon mb-6">
        Admin Analytics Dashboard
      </h1>

      {/* Approval Breakdown */}
      <div className="bg-white shadow p-6 rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Approval Status</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={[
              { name: "Approved", value: data.counts.approved },
              { name: "Pending", value: data.counts.pending },
              { name: "Rejected", value: data.counts.rejected },
            ]}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >
            {COLORS.map((c, i) => (
              <Cell key={i} fill={c} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* Projects per Category */}
      <div className="bg-white shadow p-6 rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Projects per Category</h2>
        <BarChart width={600} height={300} data={data.perCategory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#800000" />
        </BarChart>
      </div>

      {/* Projects per Faculty */}
      <div className="bg-white shadow p-6 rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Projects per Faculty</h2>
        <BarChart width={600} height={300} data={data.perFaculty}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#990000" />
        </BarChart>
      </div>

      {/* Monthly submissions */}
      <div className="bg-white shadow p-6 rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Monthly Project Submissions</h2>
        <LineChart width={700} height={300} data={data.monthly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#800000" strokeWidth={3} />
        </LineChart>
      </div>

      {/* Top Creators */}
      <div className="bg-white shadow p-6 rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Top Contributors</h2>
        <BarChart width={600} height={300} data={data.topCreators}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#cc0000" />
        </BarChart>
      </div>
    </div>
  );
}
