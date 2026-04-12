import "./globals.css";
import { PropsWithChildren } from "react";
import { AdminSidebar } from "./_components";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className="flex">
        <AdminSidebar />

        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
};

export default AdminLayout;
