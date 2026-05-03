import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Shield, Building2, Users, BarChart3, Settings, LayoutDashboard } from "lucide-react";
import Navbar from "@/components/Navbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <nav className="bg-white rounded-xl shadow-card p-3 sticky top-20">
            <div className="flex items-center gap-2 px-3 mb-4 pb-3 border-b border-slate-100">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="font-bold text-sm text-purple-700">Admin Panel</span>
            </div>
            {[
              { href: "/admin", icon: LayoutDashboard, label: "Overview" },
              { href: "/admin/properties", icon: Building2, label: "Properties" },
              { href: "/admin/users", icon: Users, label: "Users" },
              { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
              { href: "/admin/settings", icon: Settings, label: "Settings" },
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
