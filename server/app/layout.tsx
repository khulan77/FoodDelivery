// import type { Metadata } from "next";
// import { PropsWithChildren } from "react";

// export const metadata: Metadata = {
//   title: "Food Delivery Service",
// };

// export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import connectToMongoDB from "@/utils/mongoose";

export const metadata: Metadata = {
  title: "Food Delivery Service",
};

// Layout-ыг async болгож өөрчилнө
export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  // 2. Датабааз руу холбогдох функцийг энд дуудаж өгнө
  try {
    await connectToMongoDB();
  } catch (error) {
    console.error("Layout-аас DB холбоход алдаа гарлаа:", error);
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
