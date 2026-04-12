"use client";

import { Header } from "@/app/(main)/_components";
import { Footer } from "@/app/(main)/_components/Footer";
import { CartProvider } from "@/app/(main)/context";
import { Toaster } from "sonner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="bg-[#404040]">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <Toaster richColors position="top-right" />
    </CartProvider>
  );
}
