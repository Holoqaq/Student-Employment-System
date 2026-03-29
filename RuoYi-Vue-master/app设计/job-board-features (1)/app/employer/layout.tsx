"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Plus, List, ArrowLeft, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { href: "/employer", label: "岗位管理", icon: List },
  { href: "/employer/new", label: "发布岗位", icon: Plus },
];

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-emerald-500/10 bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-600 shadow-lg shadow-emerald-600/10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/employer" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold tracking-tight text-primary-foreground">
                  智联校园
                </span>
                <span className="rounded-md bg-primary-foreground/15 px-2 py-0.5 text-xs font-medium text-primary-foreground/90">
                  用人单位端
                </span>
              </div>
            </Link>
          </div>

          <nav className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground shadow-sm backdrop-blur-sm"
                      : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              返回学生端
            </Link>
            <div
              className="relative group"
            >
              <button
                type="button"
                onMouseEnter={() => setShowLogout(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20 ring-2 ring-primary-foreground/30 transition-colors hover:bg-primary-foreground/30"
              >
                <User className="h-4 w-4 text-primary-foreground" />
              </button>
              {showLogout && (
                <div
                  className="absolute right-0 mt-1 w-40 rounded-md bg-white shadow-lg py-1 z-50"
                  onMouseEnter={() => setShowLogout(true)}
                  onMouseLeave={() => setShowLogout(false)}
                >
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {user?.name || '企业用户'}
                  </div>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    退出登录
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
