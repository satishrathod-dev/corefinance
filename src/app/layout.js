// app/layout.js
"use client"
import "../app/(dashboard)/globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
