// app/dashboard/layout.tsx
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardSidebar from "../components/DashboardSidebar";
import Navbar from "../components/Navigation"; // optional, if you want top navbar too

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar - always visible on desktop */}
        <DashboardSidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Optional: Top navbar */}
          {/* <Navbar /> */}

          {/* Page content */}
          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
