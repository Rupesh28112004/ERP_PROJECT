import { useEffect, useState } from 'react';
import { Users, Package, Briefcase, DollarSign } from 'lucide-react';
import Card from '../components/Card';
import { getAllEmployees } from '../services/employeeService';
import { getAllProjects } from '../services/projectService';
import { getAllTransactions } from '../services/financeService';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const parsed = JSON.parse(userStr);
      setRole(parsed.role);
    }

    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [employees, projects, transactions] = await Promise.all([
        getAllEmployees(),
        getAllProjects(),
        getAllTransactions()
      ]);

      const revenue = transactions
        .filter(t => t.type === 'Credit')
        .reduce((sum, t) => sum + t.amount, 0);

      setStats({
        totalEmployees: employees.length,
        totalProjects: projects.length,
        pendingTasks: 12,
        totalRevenue: revenue
      });

      setTimeout(() => setLoading(false), 600); // subtle delay for smooth skeleton transition
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">
        Dashboard
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Skeleton Loader */}
        {loading && (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-gray-200 animate-pulse shadow-sm"
              ></div>
            ))}
          </>
        )}

        {!loading && (
          <>
            {(role === "admin" || role === "manager") && (
              <div className="animate-slide-up">
                <Card
                  title="Total Employees"
                  value={stats.totalEmployees}
                  icon={<Users size={28} />}
                  color="bg-blue-500"
                  className="transition-all hover:shadow-lg hover:scale-[1.02]"
                />
              </div>
            )}

            <div className="animate-slide-up delay-75">
              <Card
                title="Total Projects"
                value={stats.totalProjects}
                icon={<Briefcase size={28} />}
                color="bg-green-500"
                className="transition-all hover:shadow-lg hover:scale-[1.02]"
              />
            </div>

            <div className="animate-slide-up delay-100">
              <Card
                title="Pending Tasks"
                value={stats.pendingTasks}
                icon={<Package size={28} />}
                color="bg-orange-500"
                className="transition-all hover:shadow-lg hover:scale-[1.02]"
              />
            </div>

            {(role === "admin" || role === "manager") && (
              <div className="animate-slide-up delay-150">
                <Card
                  title="Total Revenue"
                  value={`₹${stats.totalRevenue.toLocaleString()}`}
                  icon={<DollarSign size={28} />}
                  color="bg-purple-500"
                  className="transition-all hover:shadow-lg hover:scale-[1.02]"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
