import Link from "next/link";
import { Home } from "lucide-react";
import { BrandWordmark } from "@/components/BrandWordmark";
import { brand } from "@/lib/brand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <BrandWordmark className="text-xl text-white" prefixClassName="text-white" />
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <footer className="p-4 text-center text-xs text-primary-300">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </footer>
    </div>
  );
}
