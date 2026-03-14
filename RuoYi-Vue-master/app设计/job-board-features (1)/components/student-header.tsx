"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  FileText,
  Home,
  Send,
  GraduationCap,
  User,
  Bell,
  LogOut,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { href: "/", label: "主页", icon: Home },
  { href: "/resume", label: "我的简历", icon: FileText },
  { href: "/search", label: "岗位搜索", icon: Briefcase },
  { href: "/applications", label: "投递记录", icon: Send },
  { href: "/employment", label: "就业去向", icon: GraduationCap },
  { href: "/analytics", label: "数据分析", icon: BarChart3 },
];

export function StudentHeader() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-gradient-to-r from-primary via-primary to-blue-700 shadow-lg shadow-primary/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-primary-foreground">
            智联校园
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
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
          <div className="relative group">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-primary-foreground">
                3
              </span>
              <span className="sr-only">通知</span>
            </button>
            {showNotifications && (
              <div
                className="absolute right-0 mt-1 w-80 rounded-md bg-white shadow-lg py-1 z-50"
                onMouseLeave={() => setShowNotifications(false)}
              >
                <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
                  通知中心
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">您的简历已通过审核</p>
                        <p className="text-xs text-gray-500 mt-1">2分钟前</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">有3个新岗位推荐</p>
                        <p className="text-xs text-gray-500 mt-1">1小时前</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <Send className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">您的投递已被查看</p>
                        <p className="text-xs text-gray-500 mt-1">3小时前</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 text-center border-t border-gray-100">
                  <Link href="/notifications" className="text-sm text-primary hover:underline">查看全部通知</Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/employer"
            className="hidden rounded-md px-2.5 py-1.5 text-sm text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground lg:block"
          >
            用人单位端
          </Link>
          <Link
            href="/admin"
            className="hidden rounded-md px-2.5 py-1.5 text-sm text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground lg:block"
          >
            管理员端
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
                  {user?.name || '用户'}
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

      {/* Mobile nav */}
      <nav className="flex items-center justify-around bg-primary-foreground/5 px-2 py-1.5 backdrop-blur-sm md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-2.5 py-1.5 text-xs transition-all",
                isActive
                  ? "bg-primary-foreground/20 text-primary-foreground font-medium"
                  : "text-primary-foreground/60 hover:text-primary-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
