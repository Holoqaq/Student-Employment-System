"use client";

import React, { useState } from "react";

import Link from "next/link";
import { ArrowLeft, Shield, User, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout, user } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-slate-700/30 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-900 shadow-lg shadow-slate-900/20">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/15 backdrop-blur-sm">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold tracking-tight text-primary-foreground">
                智联校园
              </span>
              <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-300">
                管理员端
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/employer"
              className="rounded-lg px-2.5 py-1.5 text-sm text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              用人单位端
            </Link>
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
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/15 ring-2 ring-primary-foreground/30 transition-colors hover:bg-primary-foreground/25"
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
                    {user?.name || '管理员'}
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
