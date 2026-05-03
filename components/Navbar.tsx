"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Home, Building2, Heart, LayoutDashboard, Settings,
  LogOut, Menu, X, ChevronDown, Bell, Plus, Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-nav border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-hero-gradient rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-primary-900">
              Trust<span className="text-brand-orange">Nest</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/properties?listingType=BUY" active={false}>Buy</NavLink>
            <NavLink href="/properties?listingType=RENT" active={false}>Rent</NavLink>
            <NavLink href="/properties" active={isActive("/properties")}>All Properties</NavLink>
            <NavLink href="/projects" active={isActive("/projects")}>New Projects</NavLink>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                {/* Post property */}
                {(session.user.role === "SELLER" || session.user.role === "ADMIN") && (
                  <Link
                    href="/seller/properties/new"
                    className="btn-orange text-sm py-2"
                  >
                    <Plus className="w-4 h-4" />
                    Post Property
                  </Link>
                )}

                {/* Saved */}
                <Link
                  href="/saved"
                  className="p-2 text-slate-500 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </Link>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-100 overflow-hidden flex items-center justify-center">
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt="avatar"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-primary-700">
                          {session.user.name?.charAt(0) ?? session.user.email?.charAt(0) ?? "U"}
                        </span>
                      )}
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20 animate-fade-in">
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="font-semibold text-sm text-slate-800 truncate">
                            {session.user.name ?? "User"}
                          </p>
                          <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                          <span className={cn(
                            "mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-medium",
                            session.user.role === "ADMIN" && "bg-purple-100 text-purple-700",
                            session.user.role === "SELLER" && "bg-orange-100 text-orange-700",
                            session.user.role === "BUYER" && "bg-blue-100 text-blue-700",
                          )}>
                            {session.user.role}
                          </span>
                        </div>

                        <MenuLink href="/profile" icon={Settings} onClick={() => setUserMenuOpen(false)}>
                          My Profile
                        </MenuLink>
                        <MenuLink href="/saved" icon={Heart} onClick={() => setUserMenuOpen(false)}>
                          Saved Properties
                        </MenuLink>

                        {(session.user.role === "SELLER" || session.user.role === "ADMIN") && (
                          <MenuLink href="/seller/dashboard" icon={LayoutDashboard} onClick={() => setUserMenuOpen(false)}>
                            Seller Dashboard
                          </MenuLink>
                        )}

                        {session.user.role === "ADMIN" && (
                          <MenuLink href="/admin" icon={Shield} onClick={() => setUserMenuOpen(false)}>
                            Admin Panel
                          </MenuLink>
                        )}

                        <div className="border-t border-slate-100 mt-1 pt-1">
                          <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-primary-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary text-sm py-2">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-2 animate-fade-in">
          <MobileLink href="/properties?listingType=BUY" onClick={() => setMobileOpen(false)}>Buy</MobileLink>
          <MobileLink href="/properties?listingType=RENT" onClick={() => setMobileOpen(false)}>Rent</MobileLink>
          <MobileLink href="/properties" onClick={() => setMobileOpen(false)}>All Properties</MobileLink>

          <div className="border-t border-slate-100 pt-3 mt-2">
            {session ? (
              <>
                <MobileLink href="/profile" onClick={() => setMobileOpen(false)}>My Profile</MobileLink>
                <MobileLink href="/saved" onClick={() => setMobileOpen(false)}>Saved Properties</MobileLink>
                {(session.user.role === "SELLER" || session.user.role === "ADMIN") && (
                  <MobileLink href="/seller/dashboard" onClick={() => setMobileOpen(false)}>
                    Seller Dashboard
                  </MobileLink>
                )}
                {session.user.role === "ADMIN" && (
                  <MobileLink href="/admin" onClick={() => setMobileOpen(false)}>Admin Panel</MobileLink>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <MobileLink href="/login" onClick={() => setMobileOpen(false)}>Sign In</MobileLink>
                <MobileLink href="/register" onClick={() => setMobileOpen(false)}>Register</MobileLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-primary-50 text-primary-700"
          : "text-slate-600 hover:text-primary-700 hover:bg-slate-50"
      )}
    >
      {children}
    </Link>
  );
}

function MenuLink({
  href,
  icon: Icon,
  children,
  onClick,
}: {
  href: string;
  icon: any;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
    >
      <Icon className="w-4 h-4 text-slate-400" />
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50"
    >
      {children}
    </Link>
  );
}
