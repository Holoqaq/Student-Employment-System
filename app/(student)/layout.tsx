"use client";

import React from "react"
import { StudentHeader } from "@/components/student-header";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />
      <main>{children}</main>
    </div>
  );
}
