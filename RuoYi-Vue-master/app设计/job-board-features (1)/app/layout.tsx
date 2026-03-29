import React from "react"
import type { Metadata, Viewport } from "next";

import "./globals.css";
import { ClientProvider } from "@/components/client-provider";

export const metadata: Metadata = {
  title: "智联校园 - 高校就业推荐平台",
  description: "面向高校毕业生的智能就业推荐与管理平台，帮助学生找到最匹配的工作岗位",
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
