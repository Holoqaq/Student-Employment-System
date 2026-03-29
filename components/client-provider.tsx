"use client";

import React from "react";
import { AuthProvider } from "@/lib/auth-context";

interface ClientProviderProps {
  children: React.ReactNode;
}

export function ClientProvider({ children }: ClientProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
