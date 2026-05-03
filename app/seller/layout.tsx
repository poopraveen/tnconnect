import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import {
  LayoutDashboard, PlusCircle, Building2, MessageCircle,
  Settings, Home, BarChart3,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role !== "SELLER" && session.user.role !== "ADMIN") {
    redirect("/become-seller");
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <nav className="bg-white rounded-xl shadow-card p-3 sticky top-20">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Seller
            </p>
            {[
              { href: "/seller/dashboard", icon: LayoutDashboard, label: "Dashboard" },
              { href: "/seller/properties", icon: Building2, label: "My Properties" },
              { href: "/seller/properties/new", icon: PlusCircle, label: "Add Property" },
              { href: "/seller/messages", icon: MessageCircle, label: "Messages" },
              { href: "/seller/analytics", icon: BarChart3, label: "Analytics" },
              { href: "/seller/settings", icon: Settings, label: "Settings" },
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
